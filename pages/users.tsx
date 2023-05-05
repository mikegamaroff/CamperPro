import classNames from 'classnames';
import { Virtuoso } from 'react-virtuoso';
import { Container } from '../components/Container';
import Button from '../components/Forms/Button';
import { FormInput } from '../components/Forms/FormInput';
import { Go } from '../components/Go';
import { IconEye, IconEyeOff } from '../components/Icons';
import { UserEditRules } from '../formConfigs/editUserFieldsConfig';
import { useFormValues } from '../hooks/useFormValues';
import { objectEquals } from '../model/model';
import { User } from '../model/user';
import { useFetchUsers } from '../routes/useFetchUsers';
import styles from './users.module.css';
const FeedView: React.FC<{ user: User }> = ({ user }) => {
	return (
		<div className={classNames('card', styles.names)}>
			{user.first_name} {user.last_name}
		</div>
	);
};
function Users() {
	const { users } = useFetchUsers();

	const { setValues, formValues } = useFormValues<User>(UserEditRules, users[0] as User, objectEquals);

	return (
		<Container>
			<>
				<IconEye /> <IconEyeOff />
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
				<Virtuoso
					totalCount={users.length}
					style={{ height: 300 }}
					data={users}
					overscan={{ main: 2, reverse: 2 }}
					itemContent={(index, user) => <FeedView user={user} />}
				/>
			</>
		</Container>
	);
}

export default Users;
