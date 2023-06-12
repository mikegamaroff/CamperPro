// eslint-disable-next-line camelcase
import { User } from '@model/user';
import { useGetUser } from '@routes/useGetUser';
import jwtDecode from 'jwt-decode';
import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { hashPassword } from '../util/hashPassword';
interface UserType {
	id: string;
	email: string;
	iat: number;
	exp: number;
}
interface AuthContextInterface {
	status: 'idle' | 'authenticating' | 'authenticated' | 'invalidated' | 'unauthenticated';
	authUser: UserType | null;
	user?: User;
	login: (email: string, password: string) => Promise<void>;
	signup: (email: string, password: string) => Promise<void>;
	setUser: (user: User) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextInterface>({
	status: 'idle',
	authUser: null,
	login: async () => {},
	signup: async () => {},
	logout: () => {},
	setUser: () => {}
});

interface AuthProviderProps {
	children: ReactNode;
}

interface DecodedToken {
	id: string;
	email: string;
	iat: number;
	exp: number;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const { getUser } = useGetUser();
	const [state, setState] = useState<{
		status: 'idle' | 'authenticating' | 'authenticated' | 'invalidated' | 'unauthenticated';
		authUser: UserType | null;
		user?: User;
	}>({
		status: 'idle',
		authUser: null
	});
	const setUser = (user: User) => {
		setState(prevState => ({ ...prevState, user }));
	};
	const fetchUser = async () => {
		const token = localStorage.getItem('jwtToken');
		if (token) {
			const decoded = jwtDecode<DecodedToken>(token);
			const user: User = await getUser(decoded.id);
			if (user) {
				setState(prevState => ({ ...prevState, status: 'authenticated', authUser: decoded, user }));
			} else {
				setState(prevState => ({ ...prevState, status: 'unauthenticated', authUser: null }));
			}
		} else {
			setState(prevState => ({ ...prevState, status: 'unauthenticated', authUser: null }));
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	const login = async (email: string, password: string) => {
		try {
			setState(prevState => ({ ...prevState, status: 'authenticating' }));
			const response = await fetch('/api/auth?action=login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});
			if (!response.ok) {
				throw new Error('Invalid email or password');
			}
			const { token } = await response.json();
			localStorage.setItem('jwtToken', token);
			const decoded = jwtDecode<DecodedToken>(token);
			setState(prevState => ({ ...prevState, status: 'authenticated', authUser: decoded }));

			// Fetch user data
			fetchUser();
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err);
			throw err;
		}
	};

	const signup = async (email: string, password: string) => {
		try {
			setState(prevState => ({ ...prevState, status: 'authenticating' }));
			const hashedPassword = await hashPassword(password);
			const response = await fetch('/api/auth?action=signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password: hashedPassword })
			});

			if (!response.ok) {
				throw new Error('Failed to signup');
			}

			await login(email, password);

			// Fetch user data
			fetchUser();
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err);
			throw err;
		} finally {
			setState(prevState => ({ ...prevState, status: 'idle' }));
		}
	};

	const logout = () => {
		localStorage.removeItem('jwtToken');
		setState(prevState => ({ ...prevState, status: 'unauthenticated', authUser: null }));
	};
	return <AuthContext.Provider value={{ ...state, login, signup, logout, setUser }}>{children}</AuthContext.Provider>;
};
