// pages/login.tsx
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useLogin } from '../routes/useLogin';

export default function LoginPage() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');
	const { loginUser, isLoading, isError, isSuccess } = useLogin(); // Use the custom hook
	const router = useRouter();
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await loginUser(email, password);
			if (response.success) {
				router.push('/'); // Redirect to home page or any other protected route
			} else {
				setError(response.message);
			}
		} catch (err) {
			setError('Unable to log in. Please try again.');
		}
	};

	return (
		<div>
			<h1>Login</h1>
			{isLoading ? (
				<ion-item>
					<ion-label>Dots</ion-label>
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
