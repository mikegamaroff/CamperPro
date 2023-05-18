// userContext.tsx
import React, { ReactNode, createContext, useState } from 'react';
import { User } from '../model/user';

interface UserContextInterface {
	users: User[];
	setUsers: React.Dispatch<React.SetStateAction<User[]>>;
	updateImage: (data: User) => void;
}

export const UserContext = createContext<UserContextInterface>({
	users: [],
	setUsers: () => {},
	updateImage: () => {}
});

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [users, setUsers] = useState<User[]>([]);
	const updateImage = (data: User) => {
		if (data) {
			setUsers(users.map(user => (user._id === data._id ? data : user)));
		}
	};
	return <UserContext.Provider value={{ users, setUsers, updateImage }}>{children}</UserContext.Provider>;
};
