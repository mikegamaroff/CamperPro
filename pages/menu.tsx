import { Container } from '@components/Container';
import { Go } from '@components/Go';
import { IconForest, IconForwardArrow, IconLogout } from '@components/Icons';
import MenuItem from '@components/MenuItem';
import { ProfilePic } from '@components/ProfilePic';
import { AuthContext } from '@context/authContext';
import { UserContext } from '@context/userContext';
import classNames from 'classnames';
import { useContext } from 'react';
import withAuth from './withAuth';
// eslint-disable-next-line css-modules/no-unused-class
import sharedStyles from '../styles/shared.module.css';
import styles from './menu.module.css';
function Menu() {
	const { mode, setMode } = useContext(UserContext);
	const { logout, user } = useContext(AuthContext);
	const handleLogout = () => {
		logout();
	};

	return (
		<>
			<Container>
				<div className={styles.menuContainer}>
					<h1 className="bold">Menu</h1>
					<div className={styles.modeView}>
						<div className="subtitle">{mode === 'Host' ? 'Hosting' : 'Camper'}</div>
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
						<Go href="/profile/">
							<MenuItem label="Upcoming Campouts" icon={<IconForest />} underline={false} />
						</Go>
						<hr />
						<Go href="/profile/">
							<MenuItem label="Profile" icon={<ProfilePic user={user} size={24} />} underline={false} />
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
