// pages/signup.tsx
import { useRouter } from 'next/router';
import { KeyboardEvent, MouseEvent, useState } from 'react';
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
import { useAddUser } from '../routes/useAddUser';
import withLoginRedirect from './withLoginRedirect';
// eslint-disable-next-line css-modules/no-unused-class
import onboardingStyles from '../styles/onboarding.module.css';
import styles from './login.module.css';
function SignupPage() {
	const [error, setError] = useState<string>('');
	const { addUser, isLoading } = useAddUser(); // Use the custom hook
	const router = useRouter();
	const { showToast } = useGlobalToast();
	const {
		setValues,
		formValues,
		stateDataObject: newUser
	} = useFormValues<User>(UserEditRules, EmptyNewUser, objectEquals);

	const handleSubmit = async (e: MouseEvent<HTMLButtonElement, MouseEvent> | KeyboardEvent<HTMLDivElement>) => {
		e.preventDefault();

		if (newUser) {
			if (!newUser.username.trim() || !newUser.email.trim() || !newUser.password.trim()) {
				setError('All fields are required.');
				showToast('danger', 'All fields are required.');
				return;
			}
			try {
				const response = await addUser(newUser);
				if (response.success) {
					showToast('success', 'Welcome, ' + newUser.username + '. Happy camping!');
					router.push('/'); // Redirect to home page or any other protected route
				} else {
					setError(response.message);
					showToast('danger', response.message);
				}
			} catch (err: unknown) {
				if (err instanceof Error) {
					showToast('danger', err.message);
					setError(err.message);
				} else {
					console.error(err);
					setError('An unexpected error occurred. Please try again.');
				}
			}
		}
	};

	return (
		<>
			{isLoading ? (
				<IonSpinner name="dots"></IonSpinner>
			) : (
				<Container scroll>
					<div
						onKeyDown={event => {
							event.key === 'Enter' && handleSubmit(event);
						}}
					>
						<SiteLogoBanner small />
						<div className="space20" />
						<form>
							<div>
								<div className={styles.formContainer}>
									<FormInput
										nogap
										id="username"
										setValues={setValues}
										type="text"
										field={formValues?.username}
										label="Username"
									/>
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
												Sign up
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
									<p>{`Already have an account?`}</p>
									<div className={styles.signupButton}>
										<Go href="/login">
											<Button
												color="tertiary"
												fill="solid"
												size="default"
												className="radius8"
												expand="block"
											>
												Go to Login
											</Button>
										</Go>
									</div>
								</div>
							</div>
						</form>
					</div>
				</Container>
			)}
		</>
	);
}

export default withLoginRedirect(SignupPage);
