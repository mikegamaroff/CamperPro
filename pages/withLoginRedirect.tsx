import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useValidateUser from '../routes/useValidateUser';
const withLoginRedirect = <Props extends object>(WrappedComponent: NextPage<Props>) => {
	const WithLoginRedirectWrapper = (props: Props) => {
		const router = useRouter();
		const { status } = useValidateUser();

		useEffect(() => {
			if (status === 'authenticated') {
				router.replace('/'); // Redirect to the home page
			}
		}, [status, router]);

		if (status === 'authenticating') {
			return <p>Authenticating...</p>;
		}

		if (status === 'invalidated' || status === 'unauthenticated') {
			return <WrappedComponent {...props} />;
		}

		return null;
	};

	if (WrappedComponent.getInitialProps) {
		WithLoginRedirectWrapper.getInitialProps = WrappedComponent.getInitialProps;
	}

	return WithLoginRedirectWrapper;
};

export default withLoginRedirect;
