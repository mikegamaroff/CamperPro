import { useRouter } from 'next/router';
import { KeyboardEvent, MouseEvent } from 'react';
import { Container } from '../components/Container';
import Button from '../components/Forms/Button';
import { FormInput } from '../components/Forms/FormInput';
import IonSpinner from '../components/Framework/IonSpinner';
import { Go } from '../components/Go';
import { SiteLogoBanner } from '../components/SiteLogoBanner';
import { useGlobalToast } from '../context/toastContext';
import { UserEditRules } from '../formConfigs/editUserFieldsConfig';
import { useFormValues } from '../hooks/useFormValues';
import { objectEquals } from '../model/model';
import { EmptyNewUser, User } from '../model/user';
import { useLogin } from '../routes/useLogin';
import withLoginRedirect from './withLoginRedirect';
// eslint-disable-next-line css-modules/no-unused-class
import onboardingStyles from '../styles/onboarding.module.css';
import styles from './login.module.css';

function LoginPage() {
	const { loginUser, isLoading } = useLogin(); // Use the custom hook
	const router = useRouter();
	const { showToast } = useGlobalToast();
	const {
		setValues,
		formValues,
		stateDataObject: newUser
	} = useFormValues<User>(UserEditRules, EmptyNewUser, objectEquals);
	const handleSubmit = async (e: MouseEvent<HTMLButtonElement, MouseEvent> | KeyboardEvent<HTMLDivElement>) => {
		e.preventDefault();

		if (!newUser?.email.trim() || !newUser.password.trim()) {
			showToast('danger', 'All fields are required.');
			return;
		}
		try {
			const response = await loginUser(newUser.email, newUser.password);
			if (response.success) {
				showToast('success', 'You successfully logged in');
				router.push('/'); // Redirect to home page or any other protected route
			} else {
				showToast('danger', response.message);
			}
		} catch (err: unknown) {
			if (err instanceof Error) {
				showToast('danger', err.message);
			} else {
				// eslint-disable-next-line no-console
				console.error(err);
			}
		}
	};

	return (
		<div>
			{isLoading ? (
				<IonSpinner name="dots"></IonSpinner>
			) : (
				<Container hidetabs>
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
									<FormInput
										nogap
										id="email"
										setValues={setValues}
										type="text"
										field={formValues?.email}
										label="Email"
									/>
									<FormInput
										nogap
										id="password"
										setValues={setValues}
										type="password"
										field={formValues?.password}
										label="Password"
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
												fill="outline"
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
