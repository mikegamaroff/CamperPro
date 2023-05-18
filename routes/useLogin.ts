import { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';

interface LoginResponse {
	success: boolean;
	message: string;
}

export const useLogin = () => {
	const { login } = useContext(AuthContext);
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>(null);
	const [isSuccess, setSuccess] = useState(false);

	const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const response = await fetch('/api/auth?action=login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // Include the JWT in the Authorization header
				},
				body: JSON.stringify({ email, password })
			});

			if (response.ok) {
				await login(email, password); // Pass only email and password
				setLoading(false);
				setSuccess(true);
				return { success: true, message: 'Logged in successfully' };
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

	return { loginUser, isLoading, isError, isSuccess };
};
