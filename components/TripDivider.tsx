import styles from './TripDivider.module.css';
export const TripDivider: React.FC<{ label: string; topline?: boolean; empty?: boolean }> = ({
	label,
	topline,
	empty
}) => {
	return (
		<div>
			<div className={styles.dividerContainer}>
				{topline && <div className={styles.topLine} />}
				<div className={styles.dividerLine} />
				<div className={styles.dividerLabel}>{label}</div>
				<div className={styles.dividerLine} />
			</div>
		</div>
	);
};
