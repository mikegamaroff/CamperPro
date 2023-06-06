import { User } from '@model/user';
import { useEffect, useState } from 'react';

export const useGetUser = (id: string | undefined) => {
	const [user, setUser] = useState<User>();
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>(null);
	const [isSuccess, setSuccess] = useState(false);

	useEffect(() => {
		async function fetchUser() {
			setLoading(true);
			setError(null);
			setSuccess(false);

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
			} else {
				setLoading(false);
				setError('Failed to fetch users');
				console.error('Failed to fetch users');
			}
		}

		fetchUser();
	}, [setUser]);

	return { user, isLoading, isError, isSuccess };
};
