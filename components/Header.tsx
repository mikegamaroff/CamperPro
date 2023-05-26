import { IonHeader, IonToolbar } from './Framework/IonHeaderToolbarTitle';
import styles from './Header.module.css';
import { SiteIcon } from './SiteIcon';
interface HeaderType {
	left?: JSX.Element;
	title?: string | 'logo';
	right?: JSX.Element;
}
export const Header: React.FC<HeaderType> = ({ left, title, right }) => {
	return (
		<IonHeader>
			<IonToolbar>
				<div className={styles.headerContainer}>
					<div className={styles.left}>{left || <div />}</div>
					{title ? (
						title === 'logo' ? (
							<div className={styles.headerLogo}>
								<SiteIcon />
							</div>
						) : (
							<h5 className={`${styles.headerTitle} bold`}>{title}</h5>
						)
					) : null}

					<div className={styles.right}>{right || <div />}</div>
				</div>
			</IonToolbar>
		</IonHeader>
	);
};
