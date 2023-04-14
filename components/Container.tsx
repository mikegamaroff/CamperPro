import classNames from 'classnames';
import { useContext } from 'react';
import { RouteContext } from './CustomLink'; // Import RouteContext from CustomLink
import { PageTransition } from './PageTransition';

export const Container: React.FC<{
	children: JSX.Element;
	scroll?: boolean;
}> = ({ children, scroll = false }) => {
	const routeContext = useContext(RouteContext); // Use RouteContext

	return (
		<PageTransition routeTransition={routeContext.routeTransition}>
			<div className={classNames('innerContent', scroll && 'scrollContent')}>{children}</div>
		</PageTransition>
	);
};
