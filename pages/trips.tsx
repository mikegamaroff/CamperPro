import Image from 'next/image';
import { useContext } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { v4 as uuidv4 } from 'uuid';
import { Container } from '../components/Container';
import Button from '../components/Forms/Button';
import { FormInput } from '../components/Forms/FormInput';
import { Go } from '../components/Go';
import { IconEye, IconEyeOff } from '../components/Icons';
import { UploadImageButton } from '../components/UploadImageButton';
import { UserContext } from '../context/userContext';
import { UserEditRules } from '../formConfigs/editUserFieldsConfig';
import { useFormValues } from '../hooks/useFormValues';
import { objectEquals } from '../model/model';
import { User } from '../model/user';
import { useFetchUsers } from '../routes/useFetchUsers';
import styles from './trips.module.css';
import withAuth from './withAuth';

const FeedView: React.FC<{ user: User }> = ({ user }) => {
	const { updateImage } = useContext(UserContext);
	return (
		<div className={styles.userHolder}>
			{user?.images?.map(image => (
				<Image
					key={image.id}
					src={`/api/images/${image.id}.${image.contentType.split('/')[1]}`}
					alt="Campsite Image"
					width={50}
					height={50}
				/>
			))}
			<div className="card">
				{user.username} {user.email}
			</div>
			<div>
				<UploadImageButton<User> documentId={user?._id} key={uuidv4()} onSuccess={updateImage} />
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
