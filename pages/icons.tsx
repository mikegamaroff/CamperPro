import { Container } from '../components/Container';
import {
	IconCellsignal,
	IconClimbing,
	IconEye,
	IconEyeOff,
	IconFire,
	IconFishing,
	IconForest,
	IconHiking,
	IconHunting,
	IconLake,
	IconMountain,
	IconOcean,
	IconPets,
	IconProfile,
	IconRiver,
	IconSearch,
	IconTrips,
	IconWildlife
} from '../components/Icons';
import styles from './icons.module.css';
function Icons() {
	interface IconType {
		icon: JSX.Element;
		name: string;
	}

	const iconsUi: IconType[] = [
		{ icon: <IconEye />, name: 'IconEye' },
		{ icon: <IconEyeOff />, name: 'IconEyeOff' },
		{ icon: <IconSearch />, name: 'IconSearch' },
		{ icon: <IconTrips />, name: 'IconTrips' },
		{ icon: <IconProfile />, name: 'IconProfile' }
	];

	const iconsCategories: IconType[] = [
		{ icon: <IconFire />, name: 'IconFire' },
		{ icon: <IconClimbing />, name: 'IconClimbing' },
		{ icon: <IconFishing />, name: 'IconFishing' },
		{ icon: <IconForest />, name: 'IconForest' },
		{ icon: <IconHiking />, name: 'IconHiking' },
		{ icon: <IconHunting />, name: 'IconHunting' },
		{ icon: <IconLake />, name: 'IconLake' },
		{ icon: <IconMountain />, name: 'IconMountain' },
		{ icon: <IconOcean />, name: 'IconOcean' },
		{ icon: <IconPets />, name: 'IconPets' },
		{ icon: <IconRiver />, name: 'IconRiver' },
		{ icon: <IconWildlife />, name: 'IconWildlife' },
		{ icon: <IconCellsignal />, name: 'IconCellsignal' }
	];

	const IconSet: React.FC<IconType> = ({ icon, name }) => (
		<div className={styles.iconContainer}>
			<div>{icon}</div>
			<div className={styles.iconName}>{name}</div>
		</div>
	);

	return (
		<Container>
			<>
				<h1>Icons</h1>
				<div className="space20" />
				<h3>UI</h3>
				<hr />
				<div className={styles.iconsWrapper}>
					{iconsUi && iconsUi.map((icon: IconType) => <IconSet key={icon.name} {...icon} />)}
				</div>
				<div className="space20" />
				<h3>Categories</h3>
				<hr />
				<div className={styles.iconsWrapper}>
					{iconsCategories && iconsCategories.map((icon: IconType) => <IconSet key={icon.name} {...icon} />)}
				</div>
			</>
		</Container>
	);
}

export default Icons;
