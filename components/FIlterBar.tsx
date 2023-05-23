import styles from './FilterBar.module.css';
import {
	IconCellsignal,
	IconClimbing,
	IconFire,
	IconFishing,
	IconForest,
	IconHiking,
	IconHunting,
	IconLake,
	IconMountain,
	IconOcean,
	IconPets,
	IconRiver,
	IconWildlife
} from './Icons';

export const FilterBar = () => {
	return (
		<div className={styles.container}>
			<div className={styles.buttonGrey}>
				<IconRiver size={26} />
				<div className="footnote, medium">River</div>
				<div className={styles.lineBlank} />
			</div>
			<div className={styles.button}>
				<IconMountain size={26} />
				<div className="footnote, medium">Mountain</div>
				<div className={styles.line} />
			</div>
			<div className={styles.buttonGrey}>
				<IconLake size={26} />
				<div className="footnote, medium">Lake</div>
				<div className={styles.lineBlank} />
			</div>
			<div className={styles.buttonGrey}>
				<IconHunting size={26} />
				<div className="footnote, medium">Hunting</div>
				<div className={styles.lineBlank} />
			</div>
			<div className={styles.buttonGrey}>
				<IconOcean size={26} />
				<div className="footnote, medium">Sea</div>
				<div className={styles.lineBlank} />
			</div>
			<div className={styles.buttonGrey}>
				<IconWildlife size={26} />
				<div className="footnote, medium">Wildlife</div>
				<div className={styles.lineBlank} />
			</div>
			<div className={styles.buttonGrey}>
				<IconFire size={26} />
				<div className="footnote, medium">Fire</div>
				<div className={styles.lineBlank} />
			</div>
			<div className={styles.buttonGrey}>
				<IconHiking size={26} />
				<div className="footnote, medium">Hiking</div>
				<div className={styles.lineBlank} />
			</div>
			<div className={styles.buttonGrey}>
				<IconFishing size={26} />
				<div className="footnote, medium">Fishing</div>
				<div className={styles.lineBlank} />
			</div>
			<div className={styles.buttonGrey}>
				<IconForest size={26} />
				<div className="footnote, medium">Forest</div>
				<div className={styles.lineBlank} />
			</div>
			<div className={styles.buttonGrey}>
				<IconCellsignal size={26} />
				<div className="footnote, medium">Cell signal</div>
				<div className={styles.lineBlank} />
			</div>
			<div className={styles.buttonGrey}>
				<IconPets size={26} />
				<div className="footnote, medium">Pets</div>
				<div className={styles.lineBlank} />
			</div>
			<div className={styles.buttonGrey}>
				<IconClimbing size={26} />
				<div className="footnote, medium">Climbing</div>
				<div className={styles.lineBlank} />
			</div>
		</div>
	);
};
