import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useValidateUser from '../routes/useValidateUser';

const withAuth = WrappedComponent => {
	const WithAuthWrapper = props => {
		const router = useRouter();
		const { status } = useValidateUser();

		useEffect(() => {
			if (status === 'invalidated' || status === 'unauthenticated') {
				router.replace('/login');
			}
		}, [status, router]);

		if (status === 'authenticating') {
			return <p>Authenticating...</p>;
		}

		if (status === 'authenticated') {
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
