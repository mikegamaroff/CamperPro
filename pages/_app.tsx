// _app.tsx
import { defineCustomElements as ionDefineCustomElements } from '@ionic/core/loader';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
/* Core CSS required for Ionic components to work properly */
import '@ionic/core/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/core/css/normalize.css';
import '@ionic/core/css/structure.css';
import '@ionic/core/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/core/css/display.css';
import '@ionic/core/css/flex-utils.css';
import '@ionic/core/css/float-elements.css';
import '@ionic/core/css/padding.css';
import '@ionic/core/css/text-alignment.css';
import '@ionic/core/css/text-transformation.css';
import { useRouter } from 'next/router';
import IonApp from '../components/Framework/IonApp';
import { RouteContextProvider } from '../components/Go';
import { AuthProvider } from '../context/authContext';
import { CampsiteProvider } from '../context/campsiteContext';
import { RouterContext } from '../context/routerContext';
import { ToastProvider } from '../context/toastContext';
import { UserProvider } from '../context/userContext';
import '../styles/globals.css';
import '../styles/variables.css';
interface NavigateToEvent extends Event {
	detail: string;
}

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	useEffect(() => {
		if (typeof window !== 'undefined') {
			ionDefineCustomElements(window);
		}
	}, []);

	useEffect(() => {
		const handleNavigation = (event: NavigateToEvent) => {
			const href = event.detail;
			router.push(href);
		};

		window.addEventListener('navigateTo', handleNavigation as EventListener);
		return () => {
			window.removeEventListener('navigateTo', handleNavigation as EventListener);
		};
	}, [router]);
	return (
		<IonApp>
			<RouteContextProvider>
				<RouterContext.Provider value={router}>
					<AuthProvider>
						<UserProvider>
							<CampsiteProvider>
								<ToastProvider>
									<AnimatePresence>
										<Component {...pageProps} />
									</AnimatePresence>
								</ToastProvider>
							</CampsiteProvider>
						</UserProvider>
					</AuthProvider>
				</RouterContext.Provider>
			</RouteContextProvider>
		</IonApp>
	);
}

export default MyApp;
