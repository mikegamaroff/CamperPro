import classNames from 'classnames';
import { useContext } from 'react';
import { RouteContext } from './Go'; // Import RouteContext from Go
import { PageTransition } from './PageTransition';

interface ContainerProps {
	children: JSX.Element;
	scroll?: boolean;
}

export const Container = ({ children, scroll = false }: ContainerProps) => {
	const routeContext = useContext(RouteContext); // Use RouteContext

	return (
		<PageTransition routeTransition={routeContext.routeTransition}>
			<div className={classNames('innerContent', scroll && 'scrollContent')}>{children}</div>
		</PageTransition>
	);
};
