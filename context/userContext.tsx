// userContext.tsx
import React, { ReactNode, createContext, useState } from 'react';
import { ModeType, User } from '../model/user';

interface UserContextInterface {
	users: User[];
	setUsers: React.Dispatch<React.SetStateAction<User[]>>;
	updateUser: (data: User) => void;
	setMode: (mode: ModeType) => void;
	mode: ModeType;
}

export const UserContext = createContext<UserContextInterface>({
	users: [],
	setUsers: () => {},
	updateUser: () => {},
	setMode: () => '',
	mode: 'camper'
});

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [users, setUsers] = useState<User[]>([]);
	const [mode, setMode] = useState<ModeType>('camper');
	const updateUser = (data: User) => {
		if (data) {
			setUsers(users.map(user => (user._id === data._id ? data : user)));
		}
	};
	return (
		<UserContext.Provider value={{ users, setUsers, updateUser, setMode, mode }}>{children}</UserContext.Provider>
	);
};
