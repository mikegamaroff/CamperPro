import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useValidateUser from '../routes/useValidateUser';

const withAuth = WrappedComponent => {
	const WithAuthWrapper = props => {
		const router = useRouter();
		const { userIsValid, authenticating } = useValidateUser();
		console.log(userIsValid, authenticating);
		useEffect(() => {
			if (!authenticating && userIsValid !== 'validated' && userIsValid !== 'waiting') {
				router.replace('/login');
			}
		}, [userIsValid, authenticating, router]);

		if (authenticating) {
			return <p>authenticating...</p>;
		}

		if (userIsValid === 'validated') {
			return <WrappedComponent {...props} />;
		}

		return null;
	};

	if (WrappedComponent.getInitialProps) {
		WithAuthWrapper.getInitialProps = WrappedComponent.getInitialProps;
	}

	return WithAuthWrapper;
};

export default withAuth;
