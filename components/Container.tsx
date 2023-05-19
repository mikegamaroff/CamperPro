import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { useIonTabs } from '../hooks/useIonTabs';
import { IonTab, IonTabBar, IonTabButton, IonTabs } from './Framework/IonTabs';
import { RouteContext } from './Go'; // Import RouteContext from Go
import { IconProfile, IconSearch, IconTrips } from './Icons';
import { PageTransition } from './PageTransition';

interface ContainerProps {
	children: JSX.Element;
	scroll?: boolean;
	hidetabs?: boolean;
}
interface TabsType {
	select: (tab: string) => void;
}
export const Container = ({ children, scroll = false, hidetabs = false }: ContainerProps) => {
	const routeContext = useContext(RouteContext); // Use RouteContext
	const router = useRouter();
	const tabs = useIonTabs(); // Use the custom hook

	const exploreIcon = (
		<div className="tab-button">
			<IconSearch />
			Explore
		</div>
	);
	const tripsIcon = (
		<div className="tab-button">
			<IconTrips />
			Trips
		</div>
	);
	const profileIcon = (
		<div className="tab-button">
			<IconProfile />
			Profile
		</div>
	);

	useEffect(() => {
		if (typeof window !== 'undefined' && tabs) {
			// Add this condition
			(tabs as TabsType).select(router.pathname === '/' ? 'explore' : router.pathname.slice(1));
		}
	}, [router.pathname, tabs]);

	const handleTabClick = (path: string) => {
		router.push(path);

		// Select the active tab immediately after changing routes
		const tabName = path === '/' ? 'explore' : path.slice(1);
		if (tabs) {
			(tabs as TabsType).select(tabName);
		}
	};
	return (
		<>
			<PageTransition routeTransition={routeContext.routeTransition}>
				<div
					className={classNames(!hidetabs ? 'innerContent-tabs' : 'innerContent', scroll && 'scrollContent')}
				>
					{children}
				</div>
			</PageTransition>
			{!hidetabs && (
				<IonTabs key={router.pathname}>
					{/* Tab views */}
					<IonTab tab="explore" />
					<IonTab tab="trips" />
					<IonTab tab="settings" />

					{/* Tab bar */}
					<IonTabBar slot="bottom">
						<IonTabButton tab="explore" onClick={() => handleTabClick('/')}>
							{exploreIcon}
						</IonTabButton>
						<IonTabButton tab="trips" onClick={() => handleTabClick('/trips')}>
							{tripsIcon}
						</IonTabButton>
						<IonTabButton tab="settings" onClick={() => handleTabClick('/settings')}>
							{profileIcon}
						</IonTabButton>
					</IonTabBar>
				</IonTabs>
			)}
		</>
	);
};
