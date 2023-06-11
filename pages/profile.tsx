import { Container } from '@components/Container';
import { EditableField } from '@components/Forms/EditableField';
import { IconButton } from '@components/Forms/IconButton';
import { Header } from '@components/Header';
import { IconBackArrow } from '@components/Icons';
import { AuthContext } from '@context/authContext';
import { useFormValues } from '@hooks/useFormValues';
import { objectEquals } from '@model/model';
import { User } from '@model/user';
import { UserEditRules } from 'formConfigs/editUserFieldsConfig';
import { useContext } from 'react';
import withAuth from './withAuth';
// eslint-disable-next-line css-modules/no-unused-class
import formStyles from '../components/Forms/FormFields.module.css';
function Profile() {
	const { user } = useContext(AuthContext);

	const { setValues, formValues, stateDataObject: newUser } = useFormValues<User>(UserEditRules, user, objectEquals);
	console.log(formValues?.first_name);
	return (
		<>
			<Header title="logo" left={<IconButton icon={<IconBackArrow />} onClick={() => history.go(-1)} />} />

			<Container>
				<div className="contentWrapper">
					<div className={formStyles.fixedFieldContainer}>
						<EditableField
							id="first_name"
							setValues={setValues}
							field={formValues?.first_name}
							label="First Name"
						/>
					</div>
				</div>
			</Container>
		</>
	);
}

export default withAuth(Profile);
