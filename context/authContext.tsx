import jwt_decode from 'jwt-decode';
import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { hashPassword } from '../util/hashPassword';

interface AuthContextInterface {
	isAuthenticated: boolean;
	user: any;
	authenticating: boolean;
	login: (email: string, password: string) => Promise<void>;
	signup: (email: string, password: string) => Promise<void>;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextInterface>({
	isAuthenticated: false,
	user: null,
	authenticating: false,
	login: async () => {},
	signup: async () => {},
	logout: () => {}
});

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<any>(null);
	const [authenticating, setauthenticating] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem('jwtToken');
		if (token) {
			const decoded = jwt_decode(token);
			setUser(decoded);
			setIsAuthenticated(true);
			setauthenticating(false);
		}
	}, []);

	const login = async (email: string, password: string) => {
		try {
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

			const decoded: any = jwt_decode(token);
			const { password: _, ...user } = decoded;

			setUser(user);
			setIsAuthenticated(true);
		} catch (err) {
			console.error(err);
			throw err;
		}
	};

	const signup = async (email: string, password: string) => {
		setauthenticating(true);
		try {
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
			console.error(err);
			throw err;
		} finally {
			setauthenticating(false);
		}
	};

	const logout = () => {
		localStorage.removeItem('jwtToken');
		setUser(null);
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, authenticating, login, signup, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
