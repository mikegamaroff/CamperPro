import { User } from '@model/user';
import { useCallback, useState } from 'react';

export const useGetUser = () => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>(null);
	const [isSuccess, setSuccess] = useState(false);

	const getUser = useCallback(async (id: string) => {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const response = await fetch(`/api/users/${id}`, {
				method: 'GET', // Explicitly specify the method
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // Include the JWT in the Authorization header
				}
			});

			if (response.ok) {
				const data = await response.json();
				setUser(data);
				setLoading(false);
				setSuccess(true);
				return data; // Return fetched user data
			} else {
				throw new Error('Failed to fetch user');
			}
		} catch (error) {
			setLoading(false);
			setError(error instanceof Error ? error.message : 'Unknown error');
			console.error(error);
			return null; // Return null if fetch failed
		}
	}, []); // Empty dependency array as `getUser` does not depend on any outer scope variables

	return { user, isLoading, isError, isSuccess, getUser };
};
