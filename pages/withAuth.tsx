import useValidateUser from '@routes/useValidateUser';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = <Props extends object>(WrappedComponent: NextPage<Props>) => {
	const WithAuthWrapper = (props: Props) => {
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
