import { useContext } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { v4 as uuidv4 } from 'uuid';
import { Container } from '../components/Container';
import Button from '../components/Forms/Button';
import { FormInput } from '../components/Forms/FormInput';
import { Go } from '../components/Go';
import { IconEye, IconEyeOff } from '../components/Icons';
import { ProfilePhoto } from '../components/ProfilePhoto';
import ReadMore from '../components/ReadMore';
import { UploadImageButton } from '../components/UploadImageButton';
import { UserContext } from '../context/userContext';
import { UserEditRules } from '../formConfigs/editUserFieldsConfig';
import { useFormValues } from '../hooks/useFormValues';
import { objectEquals } from '../model/model';
import { User } from '../model/user';
import { useFetchUsers } from '../routes/useFetchUsers';
import withAuth from './withAuth';

const FeedView: React.FC<{ user: User }> = ({ user }) => {
	const { updateUser } = useContext(UserContext);
	return (
		<div>
			<ProfilePhoto user={user} />
			<div className="card">
				{user.username} {user.email}
			</div>
			<div>
				<UploadImageButton<User> documentId={user?._id} key={uuidv4()} onSuccess={updateUser} />
			</div>
		</div>
	);
};

function Users() {
	const { users } = useFetchUsers();

	const { setValues, formValues } = useFormValues<User>(UserEditRules, users[0] as User, objectEquals);

	return (
		<Container>
			<>
				<ReadMore
					text={
						'In this example, the ReadMore component accepts two props: text (the dynamic text to be displayed) and maxLines (the number of lines before truncation). The component uses the useState and useRef hooks to manage the expanded state and to get a reference to the text container. The useEffect hook is used to check if the text overflows the container and update the expanded state accordingly. The component renders the text within a div element with the text class, which applies the line clamping and overflow styles. If the text is not expanded, a "Read more" button is displayed, and clicking on it toggles the expanded state.'
					}
					withButton
				/>
				<IconEye /> <IconEyeOff />
				<Go href="/">
					<Button>Go to Home page</Button>
				</Go>
				<FormInput
					id="first_name"
					setValues={setValues}
					type="text"
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

export default withAuth(Users);
