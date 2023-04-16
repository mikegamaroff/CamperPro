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
import IonApp from '../components/Framework/IonApp';
import { RouteContextProvider } from '../components/Go';
import { AuthProvider } from '../context/authContext';
import { ToastProvider } from '../context/toastContext';
import { UserProvider } from '../context/userContext';
import '../styles/globals.css';
import '../styles/variables.css';

function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			ionDefineCustomElements(window);
		}
	}, []);

	return (
		<>
			<IonApp>
				<AuthProvider>
					<UserProvider>
						<ToastProvider>
							<RouteContextProvider>
								<AnimatePresence>
									<Component {...pageProps} />
								</AnimatePresence>
							</RouteContextProvider>
						</ToastProvider>
					</UserProvider>
				</AuthProvider>
			</IonApp>
			<script defer src="../static/js/ionic.min.js"></script>
		</>
	);
}

export default MyApp;
