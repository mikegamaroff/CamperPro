// pages/signup.tsx
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useGlobalToast } from '../context/toastContext';
import { User } from '../model/user';
import { useAddUser } from '../routes/useAddUser';
function SignupPage() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');
	const { addUser, isLoading, isError, isSuccess } = useAddUser(); // Use the custom hook
	const router = useRouter();
	const { showToast } = useGlobalToast();
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const newUser: User = {
				_id: `user:${uuidv4()}`,
				type: 'user',
				first_name: 'Test 1',
				last_name: 'test 2',
				email: email,
				password: password,
				phone_number: '123-456-7890',
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
				username: '',
				suspended: false
			};

			const response = await addUser(newUser);
			if (response.success) {
				showToast('success', 'Welcome, ' + newUser.first_name + '. Happy camping!');
				router.push('/'); // Redirect to home page or any other protected route
			} else {
				setError(response.message);
				showToast('danger', response.message);
			}
		} catch (err) {
			showToast('danger', err.message);
			setError('Unable to sign up. Please try again.');
		}
	};

	return (
		<div>
			<h1>Sign Up</h1>
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
					<button type="submit">Sign Up</button>
				</form>
			)}
			<ul>{/* Render users or any other components here */}</ul>
		</div>
	);
}

export default SignupPage;
