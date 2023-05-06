import { useRouter } from 'next/router';
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';
import { Container } from '../components/Container';
import Button from '../components/Forms/Button';
import { Input } from '../components/Forms/Input';
import IonSpinner from '../components/Framework/IonSpinner';
import { Go } from '../components/Go';
import { SiteLogoBanner } from '../components/SiteLogoBanner';
import { useGlobalToast } from '../context/toastContext';
import { useLogin } from '../routes/useLogin';
import withLoginRedirect from './withLoginRedirect';
// eslint-disable-next-line css-modules/no-unused-class
import onboardingStyles from '../styles/onboarding.module.css';
import styles from './login.module.css';

function LoginPage() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const { loginUser, isLoading } = useLogin(); // Use the custom hook
	const router = useRouter();
	const { showToast } = useGlobalToast();
	const [error, setError] = useState<string>('');

	const handleSubmit = async (e: MouseEvent<HTMLButtonElement, MouseEvent> | KeyboardEvent<HTMLDivElement>) => {
		e.preventDefault();
		try {
			const response = await loginUser(email, password);
			if (response.success) {
				showToast('success', 'You successfully logged in');
				router.push('/'); // Redirect to home page or any other protected route
			} else {
				showToast('danger', response.message);
				setError(response.message);
			}
		} catch (err: unknown) {
			if (err instanceof Error) {
				showToast('danger', err.message);
				setError(err.message);
			} else {
				// eslint-disable-next-line no-console
				console.error(err);
				setError('An unexpected error occurred. Please try again.');
			}
		}
	};

	return (
		<div>
			{isLoading ? (
				<IonSpinner name="dots"></IonSpinner>
			) : (
				<Container>
					<div
						className="contentWrapper"
						onKeyDown={event => {
							event.key === 'Enter' && handleSubmit(event);
						}}
					>
						<SiteLogoBanner />
						<div className="space20" />
						<form>
							<div>
								<div className={styles.formContainer}>
									<Input
										placeholder="Email"
										type="email"
										tabIndex={1}
										value={email}
										onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
									/>
									<Input
										placeholder="Password"
										type="password"
										tabIndex={2}
										value={password}
										onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
									/>
								</div>
								<div className={onboardingStyles.panelContainer}>
									<div className={onboardingStyles.panelRow}>
										<div className={onboardingStyles.btnUnderPadding}>
											<Button size="large" expand="block" onClick={handleSubmit} tabIndex={3}>
												Login
											</Button>
										</div>

										<div className={onboardingStyles.btnUnderPadding}>
											<Go href="/forgotPassword">
												<div>Forgot Password</div>
											</Go>
										</div>
									</div>
								</div>
								<div className={styles.signupContainer}>
									<p>{`Don't have an account?`}</p>
									<div className={styles.signupButton}>
										<Go href="/signup">
											<Button
												color="tertiary"
												fill="solid"
												size="default"
												className="radius8"
												expand="block"
											>
												Sign up for an account
											</Button>
										</Go>
									</div>
								</div>
							</div>
						</form>
					</div>
				</Container>
			)}
		</div>
	);
}

export default withLoginRedirect(LoginPage);
