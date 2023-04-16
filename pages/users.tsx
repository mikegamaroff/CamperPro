import { Container } from '../components/Container';
import Button from '../components/Forms/Button';
import { FormInput } from '../components/Forms/FormInput';
import { Go } from '../components/Go';
import { EyeIcon, EyeOffIcon } from '../components/Icons';
import { UserEditRules } from '../formConfigs/editUserFieldsConfig';
import { useFormValues } from '../hooks/useFormValues';
import { objectEquals } from '../model/model';
import { User } from '../model/user';
import { useFetchUsers } from '../routes/useFetchUsers';
function Users() {
	const { users } = useFetchUsers();

	const { setValues, formValues } = useFormValues<User>(UserEditRules, users[0] as User, objectEquals);

	return (
		<Container>
			<>
				<EyeIcon /> <EyeOffIcon />
				<Go href="/">
					<Button>Go to Home page</Button>
				</Go>
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
