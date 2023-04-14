import { FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Container } from '../components/Container';
import { CustomLink } from '../components/CustomLink';
import { FormInput } from '../components/Forms/FormInput';
import { EyeIcon, EyeOffIcon } from '../components/Icons';
import { UserEditRules } from '../formConfigs/editUserFieldsConfig';
import { useFormValues } from '../hooks/useFormValues';
import { objectEquals } from '../model/model';
import { User } from '../model/user';
import { useAddUser } from '../routes/useAddUser';
import { useFetchUsers } from '../routes/useFetchUsers';
function Users() {
	const { users } = useFetchUsers();
	const { addUser } = useAddUser();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const {
		setValues,
		formSuccess,
		formValues,
		validateForm,
		stateDataObject: newUser
	} = useFormValues<User>(UserEditRules, users[0] as User, objectEquals);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const newUser: User = {
			_id: `user:${uuidv4()}`,
			type: 'user',
			first_name: firstName,
			last_name: lastName,
			email: `${firstName + uuidv4()}@example.com`,
			password: 'hashed_password',
			phone_number: '123-456-7890',
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			username: '',
			suspended: false
		};

		const response = await addUser(newUser);
		if (response.success) {
			setFirstName('');
			setLastName('');
		} else {
			console.error(response.message);
		}
	};

	return (
		<Container>
			<>
				<EyeIcon /> <EyeOffIcon />
				<CustomLink href="/">
					<ion-button>Go to Home page</ion-button>
				</CustomLink>
				<FormInput
					id="first_name"
					setValues={setValues}
					type="password"
					field={formValues?.first_name}
					label="First NAme"
				/>
				<ul>
					{users &&
						users.map((user: User, i) => (
							<li key={`${user._id}-${i * Math.random()}`}>
								{user.first_name} {user.last_name}
							</li>
						))}
				</ul>
			</>
		</Container>
	);
}

export default Users;
