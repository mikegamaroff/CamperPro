import styles from './Footer.module.css';
import { IonFooter, IonToolbar } from './Framework/IonHeaderToolbarTitle';
interface footerType {
	left?: JSX.Element;
	right?: JSX.Element;
}
export const Footer: React.FC<footerType> = ({ left, right }) => {
	return (
		<IonFooter>
			<IonToolbar position="bottom">
				<div className={styles.footerContainer}>
					<div className={styles.left}>{left || <div />}</div>

					<div className={styles.right}>{right || <div />}</div>
				</div>
			</IonToolbar>
		</IonFooter>
	);
};
