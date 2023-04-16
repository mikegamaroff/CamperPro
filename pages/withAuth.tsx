import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useValidateUser from '../routes/useValidateUser';

const withAuth = <Props extends object>(WrappedComponent: React.ComponentType<Props>) => {
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

	if ((WrappedComponent as any).getInitialProps) {
		WithAuthWrapper.getInitialProps = (WrappedComponent as any).getInitialProps;
	}

	return WithAuthWrapper;
};

export default withAuth;
