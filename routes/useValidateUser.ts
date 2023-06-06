import { AuthContext } from '@context/authContext';
import { User } from '@model/user';
import jwtDecode from 'jwt-decode';
import { useContext, useEffect } from 'react';

interface DecodedToken {
	id: string;
	email: string;
	iat: number;
	exp: number;
}

const useValidateUser = () => {
	const { authUser, status, logout } = useContext(AuthContext);

	useEffect(() => {
		async function validateUser() {
			if (authUser && status === 'authenticated') {
				try {
					const response = await fetch(`/api/users?id=${authUser.id}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // Include the JWT in the Authorization header
						}
					});
					if (response.ok) {
						const userData: User = await response.json();
						if (userData.suspended) {
							logout();
						}
					} else {
						logout();
					}

					// check for token expiration
					const token = localStorage.getItem('jwtToken');
					if (token) {
						const decoded = jwtDecode<DecodedToken>(token);
						const currentTime = Math.floor(Date.now() / 1000);
						if (decoded.exp < currentTime) {
							logout();
						}
					}
				} catch (error) {
					console.error('Error validating user:', error);
					logout();
				}
			}
		}

		validateUser();
	}, [authUser, status, logout]);

	return { status };
};

export default useValidateUser;
