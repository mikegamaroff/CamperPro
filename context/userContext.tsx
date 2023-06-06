import React, { ReactNode, createContext, useEffect, useState } from 'react';
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
	mode: 'Camper'
});

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [users, setUsers] = useState<User[]>([]);
	const [mode, setModeState] = useState<ModeType>('Camper');

	// Load the mode from local storage on component mount
	useEffect(() => {
		const savedMode = localStorage.getItem('mode');
		if (savedMode) {
			setModeState(savedMode as ModeType);
		}
	}, []);

	// Save the mode to local storage when it changes
	const setMode = (newMode: ModeType) => {
		setModeState(newMode);
		localStorage.setItem('mode', newMode);
	};

	const updateUser = (data: User) => {
		if (data) {
			setUsers(users.map(user => (user._id === data._id ? data : user)));
		}
	};

	return (
		<UserContext.Provider value={{ users, setUsers, updateUser, setMode, mode }}>{children}</UserContext.Provider>
	);
};
