import { Container } from '@components/Container';
import { IconButton } from '@components/Forms/IconButton';
import { Go } from '@components/Go';
import { IconAdd, IconForest, IconForwardArrow, IconLogout } from '@components/Icons';
import MenuItem from '@components/MenuItem';
import { ProfilePic } from '@components/ProfilePic';
import { AuthContext } from '@context/authContext';
import { UserContext } from '@context/userContext';
import { useAddCampsite } from '@routes/useAddCampsite';
import { GoTo } from '@utils/GoTo';
import { createNewCampsite } from '@utils/createNewCampsite';
import classNames from 'classnames';
import { useContext } from 'react';
import withAuth from './withAuth';
// eslint-disable-next-line css-modules/no-unused-class
import sharedStyles from '../styles/shared.module.css';
import styles from './menu.module.css';
function Menu() {
	const { mode, setMode } = useContext(UserContext);
	const { logout, user } = useContext(AuthContext);
	const { addCampsite } = useAddCampsite();
	const handleLogout = () => {
		logout();
	};
	const handleAddCampsite = async () => {
		const newCampsite = createNewCampsite(user);
		try {
			const response = await addCampsite(newCampsite);
			if (response.success) {
				GoTo(`/CampsiteEdit/${newCampsite._id}`);
			} else {
				console.error('Error adding campsite:', response.message);
			}
		} catch (error) {
			console.error('Error adding campsite:', error instanceof Error ? error.message : 'Unknown error');
		}
	};
	return (
		<>
			<Container>
				<div className={styles.menuContainer}>
					<h1 className="bold">Menu</h1>
					<div className={styles.modeView}>
						<div className={styles.modeTitle}>
							<div className="subtitle">{mode === 'Host' ? 'Hosting' : 'Camper'}</div>
							<IconButton onClick={handleAddCampsite} icon={<IconAdd />} label="Add Campsite" />
						</div>
						<div className="space10" />
						<div
							className={classNames('card', sharedStyles.iconItem)}
							onClick={() => setMode(mode === 'Host' ? 'Camper' : 'Host')}
						>
							<div className={sharedStyles.menuItemLabel}>{`Switch to ${
								mode === 'Host' ? 'Camper' : 'Host'
							} view`}</div>
							<IconForwardArrow />
						</div>
					</div>
					<div className="space10" />
					<div>
						{mode === 'Host' && user && user?.campsites?.length > 0 && (
							<>
								<Go href="user/mycampsites/">
									<MenuItem label="My Campsites" icon={<IconForest />} underline={false} />
								</Go>
								<hr />
							</>
						)}
						{mode === 'Camper' && user && (
							<>
								<Go href="user/profile/">
									<MenuItem label="Upcoming Campouts" icon={<IconForest />} underline={false} />
								</Go>
								<hr />
							</>
						)}

						<Go href="user/profile/">
							<MenuItem label="Profile" icon={<ProfilePic user={user} size={24} />} />
						</Go>
						<MenuItem onClick={handleLogout} label="Terms of service" icon={<IconLogout />} />
						<MenuItem onClick={handleLogout} label="Terms of service" icon={<IconLogout />} />
						<MenuItem onClick={handleLogout} label="Terms of service" icon={<IconLogout />} />
					</div>
				</div>
			</Container>
		</>
	);
}
export default withAuth(Menu);
