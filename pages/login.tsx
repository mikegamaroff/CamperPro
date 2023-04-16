import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import IonSpinner from '../components/Framework/IonSpinner';
import { useGlobalToast } from '../context/toastContext';
import { useLogin } from '../routes/useLogin';
export default function LoginPage() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');
	const { loginUser, isLoading } = useLogin(); // Use the custom hook
	const router = useRouter();
	const { showToast } = useGlobalToast();
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
			<h1>Login</h1>

			{isLoading ? (
				<IonSpinner name="dots"></IonSpinner>
			) : (
				<form onSubmit={handleSubmit}>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
						required
					/>
					<br />
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
						required
					/>
					<br />
					{error && <p>{error}</p>}
					<button type="submit">Log In</button>
				</form>
			)}
		</div>
	);
}
