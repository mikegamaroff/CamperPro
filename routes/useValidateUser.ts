// useValidateUser
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { User } from '../model/user';

const useValidateUser = () => {
	const { user, authenticating } = useContext(AuthContext);
	const [userIsValid, setUserIsValid] = useState<string>('waiting');

	useEffect(() => {
		async function validateUser() {
			if (user) {
				try {
					const response = await fetch(`/api/users?id=${user.id}`);
					if (response.ok) {
						const userData: User = await response.json();
						setUserIsValid(!userData.suspended ? 'validated' : 'invalidated');
					}
				} catch (error) {
					console.error('Error validating user:', error);
				}
			} else {
				setUserIsValid('waiting');
			}
		}

		validateUser();
	}, [user, authenticating]);

	return { userIsValid, authenticating };
};

export default useValidateUser;
