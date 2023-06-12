import { AuthContext } from '@context/authContext';
import { useGlobalToast } from '@context/toastContext';
import { AddUserResponse } from '@model/model';
import { User } from '@model/user';
import { useContext, useState } from 'react';

export const useUpdateUser = () => {
	const { setUser } = useContext(AuthContext);
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();
	const [isSuccess, setSuccess] = useState(false);
	const { showToast } = useGlobalToast();

	const updateUser = async (user: User): Promise<AddUserResponse> => {
		setLoading(true);
		setError(null);
		setSuccess(false);
		let toastMessage = '';
		let toastColor = '';

		try {
			// Fetch the latest user data
			const latestUserResponse = await fetch(`/api/users/${user._id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // Include the JWT in the Authorization header
				}
			});

			if (!latestUserResponse.ok) {
				const errorData = await latestUserResponse.json();
				setLoading(false);
				setError(errorData.message);
				return { success: false, message: errorData.message };
			}

			const latestUser = await latestUserResponse.json();
			user._rev = latestUser._rev; // Update _rev with the latest version

			const response = await fetch(`/api/users/${user._id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // Include the JWT in the Authorization header
				},
				body: JSON.stringify(user) // You don't include the password here
			});

			if (response.ok) {
				const data = await response.json();
				const updatedUser = data.user;
				if (updatedUser) {
					// Update the user in the user list
					setUser(data.user);
				}
				toastMessage = 'User updated';
				toastColor = 'success';
				setLoading(false);
				setSuccess(true);
				return { success: true, message: data.message };
			} else {
				const errorData = await response.json();
				setLoading(false);
				setError(errorData.message);
				toastMessage = 'Error updating user';
				toastColor = 'error';
				return { success: false, message: errorData.message };
			}
		} catch (error) {
			console.error(error);
			setLoading(false);
			setError('Internal server error');
			toastMessage = 'Internal server error';
			toastColor = 'error';
			return { success: false, message: 'Internal server error' };
		} finally {
			showToast(toastColor, toastMessage);
		}
	};

	return { updateUser, isLoading, isError, isSuccess };
};
