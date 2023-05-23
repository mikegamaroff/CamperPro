import { Container } from '../components/Container';
import {
	IconAdd,
	IconBackArrow,
	IconCellsignal,
	IconChevronForward,
	IconClimbing,
	IconClose,
	IconEye,
	IconEyeOff,
	IconFilter,
	IconFire,
	IconFishing,
	IconForest,
	IconHiking,
	IconHunting,
	IconLake,
	IconLocation,
	IconMenu,
	IconMountain,
	IconOcean,
	IconPets,
	IconProfile,
	IconRiver,
	IconSearch,
	IconStar,
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
		{ icon: <IconProfile />, name: 'IconProfile' },
		{ icon: <IconAdd />, name: 'IconAdd' },
		{ icon: <IconBackArrow />, name: 'IconBackArrow' },
		{ icon: <IconClose />, name: 'IconClose' },
		{ icon: <IconFilter />, name: 'IconFilter' },
		{ icon: <IconLocation />, name: 'IconLocation' },
		{ icon: <IconMenu />, name: 'IconMenu' },
		{ icon: <IconStar />, name: 'IconStar' },
		{ icon: <IconChevronForward />, name: 'IconChevronForward' }
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
		<Container hidetabs scroll>
			<div className="contentWrapper">
				<h1 className="bold">Icons</h1>
				<div className="space20" />
				<h3 className="bold">UI</h3>
				<hr />
				<div className={styles.iconsWrapper}>
					{iconsUi && iconsUi.map((icon: IconType) => <IconSet key={icon.name} {...icon} />)}
				</div>
				<div className="space20" />
				<h3 className="bold">Categories</h3>
				<hr />
				<div className={styles.iconsWrapper}>
					{iconsCategories && iconsCategories.map((icon: IconType) => <IconSet key={icon.name} {...icon} />)}
				</div>
			</div>
		</Container>
	);
}

export default Icons;
