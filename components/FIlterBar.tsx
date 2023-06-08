import classNames from 'classnames';
import { ComponentType, FC } from 'react';
import { Attributes, FilterIDType } from '../model/campsite';
import styles from './FilterBar.module.css';
import { IconProps, iconComponents } from './Icons';

interface FilterIconProps {
	icon: ComponentType<IconProps>;
	label: string;
	id: FilterIDType;
}

interface FilterBarProps {
	selectedAttributes?: Attributes;
	handleFilterSelect: (id: FilterIDType) => void;
}
const FilterButtons: FilterIconProps[] = [
	{
		label: iconComponents.river.label,
		icon: iconComponents.river.icon,
		id: { feature: 'river' }
	},
	{
		label: iconComponents.mountain.label,
		icon: iconComponents.mountain.icon,
		id: { feature: 'mountain' }
	},
	{
		label: iconComponents.lake.label,
		icon: iconComponents.lake.icon,
		id: { feature: 'lake' }
	},
	{
		label: iconComponents.hunting.label,
		icon: iconComponents.hunting.icon,
		id: { permitted: 'hunting' }
	},
	{
		label: iconComponents.sea.label,
		icon: iconComponents.sea.icon,
		id: { feature: 'sea' }
	},
	{
		label: iconComponents.wildlife.label,
		icon: iconComponents.wildlife.icon,
		id: { feature: 'wildlife' }
	},
	{
		label: iconComponents.campfire.label,
		icon: iconComponents.campfire.icon,
		id: { permitted: 'campfire' }
	},
	{
		label: iconComponents.hiking.label,
		icon: iconComponents.hiking.icon,
		id: { feature: 'hiking' }
	},
	{
		label: iconComponents.cellsignal.label,
		icon: iconComponents.cellsignal.icon,
		id: { amenity: 'cellsignal' }
	},
	{
		label: iconComponents.forest.label,
		icon: iconComponents.forest.icon,
		id: { feature: 'forest' }
	},
	{
		label: iconComponents.climbing.label,
		icon: iconComponents.climbing.icon,
		id: { permitted: 'climbing' }
	},
	{
		label: iconComponents.pets.label,
		icon: iconComponents.pets.icon,
		id: { permitted: 'pets' }
	},
	{
		label: iconComponents.swimming.label,
		icon: iconComponents.swimming.icon,
		id: { permitted: 'swimming' }
	},
	{
		label: iconComponents.wifi.label,
		icon: iconComponents.wifi.icon,
		id: { amenity: 'wifi' }
	},
	{
		label: iconComponents.toilet.label,
		icon: iconComponents.toilet.icon,
		id: { amenity: 'toilet' }
	},
	{
		label: iconComponents.portapot.label,
		icon: iconComponents.portapot.icon,
		id: { amenity: 'portapot' }
	},
	{
		label: iconComponents.barbecue.label,
		icon: iconComponents.barbecue.icon,
		id: { amenity: 'barbecue' }
	},
	{
		label: iconComponents.shower.label,
		icon: iconComponents.shower.icon,
		id: { amenity: 'shower' }
	}
];

export const FilterBar: FC<FilterBarProps> = ({ handleFilterSelect, selectedAttributes }) => {
	const filterExists = (id: FilterIDType): boolean => {
		if (!selectedAttributes) return false;

		for (const filterKey in id) {
			const filterValue = id[filterKey as keyof FilterIDType];
			const selectedFilterValues = selectedAttributes[filterKey as keyof Attributes];

			if (filterValue && selectedFilterValues && (selectedFilterValues as string[]).includes(filterValue)) {
				return true;
			}
		}

		return false;
	};

	return (
		<div className={styles.container}>
			{FilterButtons.map((filterbutton: FilterIconProps, i: number) => {
				const IconComponent = filterbutton.icon || null;
				return (
					<div
						key={'filterbutton' + i}
						onClick={() => handleFilterSelect(filterbutton.id)}
						className={classNames(
							filterExists(filterbutton.id) ? styles.buttonSelected : styles.buttonDefault
						)}
					>
						<IconComponent />
						<div className="caption medium">{filterbutton.label}</div>
						<div className={filterExists(filterbutton.id) ? styles.line : styles.lineBlank} />
					</div>
				);
			})}
		</div>
	);
};
