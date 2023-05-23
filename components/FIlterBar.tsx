import classNames from 'classnames';
import { FC } from 'react';
import { AmenityNames, FeatureNames, PermittedNames } from '../model/campsite';
import styles from './FilterBar.module.css';
import {
	IconCellsignal,
	IconClimbing,
	IconFire,
	IconForest,
	IconHiking,
	IconHunting,
	IconLake,
	IconMountain,
	IconPets,
	IconRiver,
	IconSea,
	IconWildlife
} from './Icons';

interface FilterIconProps {
	icon: JSX.Element;
	label: string;
	id: FeatureNames | AmenityNames | PermittedNames;
}

interface FilterBarProps {
	selectedFilter: string;
	handleFilterSelect: (id: FeatureNames | AmenityNames | PermittedNames) => void;
}
const FilterButtons: FilterIconProps[] = [
	{
		label: 'River',
		icon: <IconRiver />,
		id: 'river'
	},
	{
		label: 'Mountain',
		icon: <IconMountain />,
		id: 'mountain'
	},
	{
		label: 'Lake',
		icon: <IconLake />,
		id: 'lake'
	},
	{
		label: 'Hunting',
		icon: <IconHunting />,
		id: 'hunting'
	},
	{
		label: 'Sea',
		icon: <IconSea />,
		id: 'sea'
	},
	{
		label: 'Wildlife',
		icon: <IconWildlife />,
		id: 'wildlife'
	},
	{
		label: 'Fire',
		icon: <IconFire />,
		id: 'firepit'
	},
	{
		label: 'Hiking',
		icon: <IconHiking />,
		id: 'hikingTrails'
	},
	{
		label: 'Forest',
		icon: <IconForest />,
		id: 'forest'
	},
	{
		label: 'Cell Signal',
		icon: <IconCellsignal />,
		id: 'cellSignal'
	},
	{
		label: 'Pets',
		icon: <IconPets />,
		id: 'pets'
	},
	{
		label: 'Climbing',
		icon: <IconClimbing />,
		id: 'climbing'
	}
];

export const FilterBar: FC<FilterBarProps> = ({ handleFilterSelect, selectedFilter }) => {
	return (
		<div className={styles.container}>
			{FilterButtons.map((filterbutton: FilterIconProps, i: number) => {
				return (
					<div
						key={'filterbutton' + i}
						onClick={() => handleFilterSelect(filterbutton.id)}
						className={classNames(
							selectedFilter === filterbutton.id ? styles.buttonSelected : styles.buttonDefault
						)}
					>
						{filterbutton.icon}
						<div className="caption medium">{filterbutton.label}</div>
						<div className={selectedFilter === filterbutton.id ? styles.line : styles.lineBlank} />
					</div>
				);
			})}
		</div>
	);
};
