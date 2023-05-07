// eslint-disable-next-line camelcase
import jwtDecode from 'jwt-decode';
import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { hashPassword } from '../util/hashPassword';

interface AuthContextInterface {
	status: 'idle' | 'authenticating' | 'authenticated' | 'invalidated' | 'unauthenticated';
	user: any;
	login: (email: string, password: string) => Promise<void>;
	signup: (email: string, password: string) => Promise<void>;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextInterface>({
	status: 'idle',
	user: null,
	login: async () => {},
	signup: async () => {},
	logout: () => {}
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
	const [state, setState] = useState<{
		status: 'idle' | 'authenticating' | 'authenticated' | 'invalidated' | 'unauthenticated';
		user: any;
	}>({
		status: 'idle',
		user: null
	});

	useEffect(() => {
		const token = localStorage.getItem('jwtToken');
		if (token) {
			const decoded = jwtDecode<DecodedToken>(token);
			setState({ status: 'authenticated', user: decoded });
		} else {
			setState({ status: 'unauthenticated', user: null });
		}
	}, []);

	const login = async (email: string, password: string) => {
		try {
			setState({ ...state, status: 'authenticating' });
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
			setState({ status: 'authenticated', user: decoded });
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err);
			throw err;
		}
	};

	const signup = async (email: string, password: string) => {
		try {
			setState({ ...state, status: 'authenticating' });
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
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err);
			throw err;
		} finally {
			setState({ ...state, status: 'idle' });
		}
	};

	const logout = () => {
		localStorage.removeItem('jwtToken');
		setState({ status: 'unauthenticated', user: null });
	};

	return <AuthContext.Provider value={{ ...state, login, signup, logout }}>{children}</AuthContext.Provider>;
};
