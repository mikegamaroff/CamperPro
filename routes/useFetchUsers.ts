import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';

export const useFetchUsers = () => {
	const { users, setUsers } = useContext(UserContext);
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>(null);
	const [isSuccess, setSuccess] = useState(false);

	useEffect(() => {
		async function fetchUsers() {
			setLoading(true);
			setError(null);
			setSuccess(false);

			const response = await fetch('/api/users', {
				method: 'GET', // Explicitly specify the method
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // Include the JWT in the Authorization header
				}
			});

			if (response.ok) {
				const data = await response.json();
				setUsers(data);
				setLoading(false);
				setSuccess(true);
			} else {
				setLoading(false);
				setError('Failed to fetch users');
				console.error('Failed to fetch users');
			}
		}

		fetchUsers();
	}, [setUsers]);

	return { users, setUsers, isLoading, isError, isSuccess };
};
