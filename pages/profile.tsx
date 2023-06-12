import { Container } from '@components/Container';
import { EditableField } from '@components/Forms/EditableField';
import { IconButton } from '@components/Forms/IconButton';
import { Header } from '@components/Header';
import { IconBackArrow } from '@components/Icons';
import { ProfilePic } from '@components/ProfilePic';
import { UploadImageButton } from '@components/UploadImageButton';
import { AuthContext } from '@context/authContext';
import { useFormValues } from '@hooks/useFormValues';
import { objectEquals } from '@model/model';
import { User } from '@model/user';
import { useUpdateUser } from '@routes/useUpdateUser';
import { UserEditRules } from 'formConfigs/editUserFieldsConfig';
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import withAuth from './withAuth';
// eslint-disable-next-line css-modules/no-unused-class
import formStyles from '../components/Forms/FormFields.module.css';
import styles from './Profile.module.css';
function Profile() {
	const { user, setUser } = useContext(AuthContext);
	const { updateUser } = useUpdateUser();
	const { setValues, formValues, stateDataObject: newUser } = useFormValues<User>(UserEditRules, user, objectEquals);

	const onSave = () => {
		updateUser(newUser as User);
	};

	return (
		<>
			<Header title="logo" left={<IconButton icon={<IconBackArrow />} onClick={() => history.go(-1)} />} />

			<Container>
				<div className="contentWrapper">
					<div className={styles.profilHeaderWrapper}>
						<div className={styles.profilHeader}>
							<div className={styles.uploadButtonContainer}>
								<UploadImageButton<User> documentId={user?._id} key={uuidv4()} onSuccess={setUser} />
							</div>
							<ProfilePic user={user} size={180} />
							<div className="space20" />
							<h3 className="bold">{user?.first_name + ' ' + user?.last_name}</h3>
						</div>
					</div>
					<div className={formStyles.fixedFieldContainer}>
						<EditableField
							id="first_name"
							setValues={setValues}
							onSave={onSave}
							field={formValues?.first_name}
							label="First Name"
						/>
					</div>
					<div className={formStyles.fixedFieldContainer}>
						<EditableField
							id="last_name"
							setValues={setValues}
							onSave={onSave}
							field={formValues?.last_name}
							label="Last Name"
						/>
					</div>
					<div className={formStyles.fixedFieldContainer}>
						<EditableField
							id="email"
							setValues={setValues}
							onSave={onSave}
							field={formValues?.email}
							label="Email"
						/>
					</div>
					<div className={formStyles.fixedFieldContainer}>
						<EditableField
							id="phone_number"
							setValues={setValues}
							onSave={onSave}
							field={formValues?.phone_number}
							label="Phone Number"
						/>
					</div>
				</div>
			</Container>
		</>
	);
}

export default withAuth(Profile);
