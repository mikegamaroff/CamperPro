import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import { User } from '../model/user';

const useValidateUser = () => {
	const { user, status, logout } = useContext(AuthContext);

	useEffect(() => {
		async function validateUser() {
			if (user && status === 'authenticated') {
				try {
					const response = await fetch(`/api/users?id=${user.id}`);
					if (response.ok) {
						const userData: User = await response.json();
						if (userData.suspended) {
							logout();
						}
					}
				} catch (error) {
					console.error('Error validating user:', error);
				}
			}
		}

		validateUser();
	}, [user, status, logout]);

	return { status };
};

export default useValidateUser;
