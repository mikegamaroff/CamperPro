import { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { UserContext } from '../context/userContext';
import { User } from '../model/user';
import { hashPassword } from '../util/hashPassword';

interface AddUserResponse {
	success: boolean;
	message: string;
}

export const useAddUser = () => {
	const { users, setUsers } = useContext(UserContext);
	const { login } = useContext(AuthContext);
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState(null);
	const [isSuccess, setSuccess] = useState(false);

	const addUser = async (user: User): Promise<AddUserResponse> => {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const plainTextPassword = user.password;
			const hashedPassword = await hashPassword(plainTextPassword); // Hash the user's password

			const response = await fetch('/api/auth?action=register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...user,
					password: hashedPassword // Use the hashed password instead of the plain text password
				})
			});

			if (response.ok) {
				const data = await response.json();
				const userWithoutPassword = data.user ? { ...data.user, password: undefined } : null; // Unhash the password if the user exists
				if (userWithoutPassword) {
					setUsers([...users, userWithoutPassword]);
				}

				await login(user.email, plainTextPassword); // Authenticate the user using the hashed password
				setLoading(false);
				setSuccess(true);
				return { success: true, message: data.message };
			} else {
				const errorData = await response.json();
				setLoading(false);
				setError(errorData.message);
				return { success: false, message: errorData.message };
			}
		} catch (error) {
			console.error(error);
			setLoading(false);
			setError('Internal server error');
			return { success: false, message: 'Internal server error' };
		}
	};

	return { addUser, isLoading, isError, isSuccess };
};
