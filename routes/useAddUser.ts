import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { UserContext } from '../context/userContext';
import { User } from '../model/user';

interface AddUserResponse {
	success: boolean;
	message: string;
}

export const useAddUser = () => {
	const { users, setUsers } = useContext(UserContext);
	const { login } = useContext(AuthContext);

	const addUser = async (user: User): Promise<AddUserResponse> => {
		try {
			const response = await fetch('/api/auth?action=register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user) // Remove the password hashing from here
			});

			if (response.ok) {
				const data = await response.json();
				const userWithoutPassword = data.user ? { ...data.user, password: undefined } : null; // Unhash the password if the user exists
				if (userWithoutPassword) {
					setUsers([...users, userWithoutPassword]);
				}

				await login(user.email, user.password); // Authenticate the user using the hashed password

				return { success: true, message: data.message };
			} else {
				const errorData = await response.json();
				return { success: false, message: errorData.message };
			}
		} catch (error) {
			console.error(error);
			return { success: false, message: 'Internal server error' };
		}
	};

	return { addUser };
};
