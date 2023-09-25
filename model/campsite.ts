import { IconProps, iconComponents } from '@components/Icons';
import { FormValueType, FormValuesType } from '@hooks/useFormValues';
import { ComponentType } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DocumentWithImages } from './model';

export interface Coordinates {
	lat: number;
	lng: number;
}
export interface Address {
	address1?: string;
	county?: string;
	city?: string;
	postalCode?: string;
}
export interface Capacity {
	numberOfTentSites: number;
	acreage: number;
}

export type FeatureNames = 'default' | 'river' | 'mountain' | 'lake' | 'sea' | 'wildlife' | 'hiking' | 'forest';
export type AmenityNames = 'cellsignal' | 'wifi' | 'toilet' | 'portapot' | 'shower' | 'firepit' | 'barbecue';
export type PermittedNames = 'pets' | 'campfire' | 'fishing' | 'climbing' | 'swimming' | 'woodgathering' | 'hunting';

export type AttributeNames = 'feature' | 'amenity' | 'permitted';
export interface Attributes {
	feature?: FeatureNames[];
	amenity?: AmenityNames[];
	permitted?: PermittedNames[];
}
export interface CampLocation {
	coordinates: Coordinates;
	country: string;
	receptionAddress: Address | null;
	state: string;
	nearestTown?: string | null;
	directions: string | null;
}
export interface Campsite extends DocumentWithImages {
	author?: string;
	title?: string;
	description?: string;
	draft?: boolean;
	draftStage: number;
	rating?: number | null;
	reviewsCount?: number | null;
	tripsCount?: number | null;
	location?: CampLocation;
	pricePerNight?: number;
	receptionCheckin?: boolean;
	private?: boolean;
	capacity?: Capacity;
	attributes?: Attributes;
	active?: boolean;
	rules?: string;
}

export const defaultAttributes: Attributes = {
	feature: ['default']
};
export type FilterIDType = {
	feature?: FeatureNames;
	amenity?: AmenityNames;
	permitted?: PermittedNames;
};
export interface CampsiteLocation {
	state?: string;
	nearestTown?: string;
}
export interface CampsiteFilter {
	private?: boolean;
	rating?: number[];
	location?: CampsiteLocation;
	priceRange?: number[];
	attributes?: Attributes;
	numberOfTentSites?: number;
	acreage?: number;
	searchLocation?: string;
}

export const EmptyCampsiteLocation: CampLocation = {
	state: '',
	country: '',
	nearestTown: null,
	receptionAddress: {
		address1: '',
		county: '',
		city: '',
		postalCode: ''
	},
	coordinates: {
		lat: 0,
		lng: 0
	},
	directions: null
};

export const EmptyNewCampsite: Campsite = {
	_id: `campsite:${uuidv4()}`,
	author: '',
	type: 'campsite',
	title: '',
	rating: null,
	reviewsCount: null,
	location: EmptyCampsiteLocation,
	images: [],
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
	draft: true,
	draftStage: 0,
	description: '',
	pricePerNight: 0,
	receptionCheckin: false,
	private: false,
	capacity: {
		numberOfTentSites: 1,
		acreage: 2
	},
	attributes: defaultAttributes,
	active: true
};
export const EmptyCampsite: Campsite = EmptyNewCampsite;

export const defaultFilter: Attributes = {
	feature: ['default', 'river', 'mountain', 'lake', 'sea', 'wildlife', 'hiking', 'forest'],
	amenity: ['cellsignal', 'wifi', 'toilet', 'portapot', 'shower', 'firepit', 'barbecue'],
	permitted: ['pets', 'campfire', 'fishing', 'climbing', 'swimming', 'woodgathering', 'hunting']
};

export interface StageProps<T> {
	campsite?: Campsite | null | undefined;
	setValues: (value: FormValueType<T>) => void;
	formValues: FormValuesType<Campsite> | undefined;
	stage: number;
}

export interface FilterIconProps {
	icon: ComponentType<IconProps>;
	label: string;
	id: FilterIDType;
}

export const FilterButtons: FilterIconProps[] = [
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
		label: iconComponents.shower.label,
		icon: iconComponents.shower.icon,
		id: { amenity: 'shower' }
	},
	{
		label: iconComponents.barbecue.label,
		icon: iconComponents.barbecue.icon,
		id: { amenity: 'barbecue' }
	}
];

export const countryList = [
	{ value: 'USA', label: 'United States' },
	{ value: 'GBR', label: 'United Kingdom' },
	{ value: 'CAN', label: 'Canada' },
	{ value: 'AUS', label: 'Australia' },
	{ value: 'DEU', label: 'Germany' },
	{ value: 'FRA', label: 'France' },
	{ value: 'IND', label: 'India' },
	{ value: 'CHN', label: 'China' },
	{ value: 'JPN', label: 'Japan' },
	{ value: 'RUS', label: 'Russia' },
	{ value: 'ZAF', label: 'South Africa' },
	{ value: 'BRA', label: 'Brazil' },
	{ value: 'MEX', label: 'Mexico' },
	{ value: 'ITA', label: 'Italy' },
	{ value: 'ESP', label: 'Spain' }
];
