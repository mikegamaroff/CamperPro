import classNames from 'classnames';
import { FC } from 'react';
import { AmenityNames, AttributeFilters, FeatureNames, FilterIDType, PermittedNames } from '../model/campsite';
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
	id: FilterIDType;
}

interface FilterBarProps {
	selectedFilter?: AttributeFilters;
	handleFilterSelect: (id: FilterIDType) => void;
}
const FilterButtons: FilterIconProps[] = [
	{
		label: 'River',
		icon: <IconRiver />,
		id: { feature: 'river' }
	},
	{
		label: 'Mountain',
		icon: <IconMountain />,
		id: { feature: 'mountain' }
	},
	{
		label: 'Lake',
		icon: <IconLake />,
		id: { feature: 'lake' }
	},
	{
		label: 'Hunting',
		icon: <IconHunting />,
		id: { permitted: 'hunting' }
	},
	{
		label: 'Sea',
		icon: <IconSea />,
		id: { feature: 'sea' }
	},
	{
		label: 'Wildlife',
		icon: <IconWildlife />,
		id: { feature: 'wildlife' }
	},
	{
		label: 'Fire',
		icon: <IconFire />,
		id: { amenity: 'firepit' }
	},
	{
		label: 'Hiking',
		icon: <IconHiking />,
		id: { feature: 'hikingTrails' }
	},
	{
		label: 'Forest',
		icon: <IconForest />,
		id: { feature: 'forest' }
	},
	{
		label: 'Cell Signal',
		icon: <IconCellsignal />,
		id: { amenity: 'cellSignal' }
	},
	{
		label: 'Pets',
		icon: <IconPets />,
		id: { permitted: 'pets' }
	},
	{
		label: 'Climbing',
		icon: <IconClimbing />,
		id: { permitted: 'climbing' }
	}
];

export const FilterBar: FC<FilterBarProps> = ({ handleFilterSelect, selectedFilter }) => {
	const filterExists = (id: FilterIDType): boolean => {
		// this looks to see if the filter id in the filterbutton object
		// exists in the assembled filter array based on the clicks
		if (selectedFilter) {
			for (const key in id) {
				const filterKey = key as keyof FilterIDType;
				const filterValue = id[filterKey];
				if (filterValue) {
					if (filterKey === 'feature' && selectedFilter[filterKey]?.includes(filterValue as FeatureNames)) {
						return true;
					} else if (
						filterKey === 'amenity' &&
						selectedFilter[filterKey]?.includes(filterValue as AmenityNames)
					) {
						return true;
					} else if (
						filterKey === 'permitted' &&
						selectedFilter[filterKey]?.includes(filterValue as PermittedNames)
					) {
						return true;
					}
				}
			}
		}
		return false;
	};

	return (
		<div className={styles.container}>
			{FilterButtons.map((filterbutton: FilterIconProps, i: number) => {
				return (
					<div
						key={'filterbutton' + i}
						onClick={() => handleFilterSelect(filterbutton.id)}
						className={classNames(
							filterExists(filterbutton.id) ? styles.buttonSelected : styles.buttonDefault
						)}
					>
						{filterbutton.icon}
						<div className="caption medium">{filterbutton.label}</div>
						<div className={filterExists(filterbutton.id) ? styles.line : styles.lineBlank} />
					</div>
				);
			})}
		</div>
	);
};
