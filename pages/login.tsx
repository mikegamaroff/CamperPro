// pages/login.tsx
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useGlobalToast } from '../context/toastContext';
import { useLogin } from '../routes/useLogin';

export default function LoginPage() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');
	const { loginUser, isLoading, isError, isSuccess } = useLogin(); // Use the custom hook
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
		} catch (err) {
			showToast('danger', err.message);
			setError('Unable to log in. Please try again.');
		}
	};

	return (
		<div>
			<h1>Login</h1>

			{isLoading ? (
				<ion-item>
					<ion-spinner name="dots"></ion-spinner>
				</ion-item>
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
