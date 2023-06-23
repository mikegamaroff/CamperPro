import classNames from 'classnames';
import NextLink, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { PageTransition } from './PageTransition';

export const RouteContext = React.createContext<{
	startTransition: () => void;
	endTransition: () => void;
	routeTransition: boolean;
}>({
	startTransition: () => {},
	endTransition: () => {},
	routeTransition: false
});

interface LinksProps extends LinkProps {
	children: React.ReactNode;
}

export const Go: React.FC<LinksProps> = ({ children, ...props }) => {
	const router = useRouter();
	const routeContext = useContext(RouteContext);

	const handleClick = useCallback(
		(e: React.MouseEvent) => {
			e.stopPropagation();
			e.preventDefault();
			routeContext.startTransition();
			setTimeout(() => {
				router.push(props.href);
				router.events.on('routeChangeComplete', () => {
					routeContext.endTransition();
					router.events.off('routeChangeComplete', () => {
						routeContext.endTransition();
						router.events.off('routeChangeComplete', () => {});
					});
				});
			}, 200);
		},
		[props.href, routeContext, router]
	);

	return (
		<NextLink {...props} passHref className={classNames('nolink')}>
			{React.cloneElement(children as React.ReactElement, { onClick: handleClick })}
		</NextLink>
	);
};

interface RouteContextProviderProps {
	children: React.ReactNode;
}

export const RouteContextProvider: React.FC<RouteContextProviderProps> = ({ children }) => {
	const [routeTransition, setRouteTransition] = useState(false);

	const startTransition = useCallback(() => {
		setRouteTransition(true);
	}, []);

	const endTransition = useCallback(() => {
		setRouteTransition(false);
	}, []);

	const value = useMemo(
		() => ({
			startTransition,
			endTransition,
			routeTransition
		}),
		[startTransition, endTransition, routeTransition]
	);

	return (
		<RouteContext.Provider value={value}>
			<PageTransition routeTransition={routeTransition}>{children}</PageTransition>
		</RouteContext.Provider>
	);
};
