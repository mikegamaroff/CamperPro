import { v4 as uuidv4 } from 'uuid';
import { DocumentWithImages } from './model';

export interface Coordinates {
	lat: number;
	lng: number;
}
export interface Address {
	address1: string;
	address2: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
}
export interface Capacity {
	numberOfTentSites: number;
	acreage: number;
}

export type FeatureNames = 'default' | 'river' | 'mountain' | 'lake' | 'sea' | 'wildlife' | 'hikingTrails' | 'forest';
export type AmenityNames =
	| 'cellSignal'
	| 'wifi'
	| 'toilet'
	| 'portAPotty'
	| 'bathroom'
	| 'shower'
	| 'firepit'
	| 'barbeque';
export type PermittedNames = 'pets' | 'campfire' | 'fishing' | 'climbing' | 'swimming' | 'woodGathering' | 'hunting';

export type AttributeNames = 'feature' | 'amenity' | 'permitted';
export interface Attribute {
	type: AttributeNames;
	name: FeatureNames | AmenityNames | PermittedNames;
}
export interface CampLocation {
	coordinates: Coordinates;
	receptionAddress: Address;
}
export interface Campsite extends DocumentWithImages {
	author?: string;
	type: string;
	category: string;
	title: string;
	description: string;
	draft: boolean;
	rating: number;
	location: CampLocation;
	pricePerNight: number;
	receptionCheckin: boolean;
	campsiteType: 'private' | 'shared';
	capacity: Capacity;
	attributes: Attribute[];
	active: boolean;
}
export interface AttributeFilters {
	default?: string[];
	feature?: FeatureNames[];
	amenity?: AmenityNames[];
	permitted?: PermittedNames[];
}
export const defaultAttributes: Attribute[] = [
	{
		type: 'feature',
		name: 'default'
	}
];
export type FilterIDType = {
	feature?: FeatureNames;
	amenity?: AmenityNames;
	permitted?: PermittedNames;
};

export const EmptyNewCampsite: Campsite = {
	_id: `campsite:${uuidv4()}`,
	author: '',
	type: 'campsite',
	category: 'public',
	title: '',
	rating: 0,
	location: {
		receptionAddress: {
			address1: '',
			address2: '',
			city: '',
			state: '',
			postalCode: '',
			country: ''
		},
		coordinates: {
			lat: 0,
			lng: 0
		}
	},
	images: [],
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
	draft: true,
	description: '',
	pricePerNight: 0,
	receptionCheckin: false,
	campsiteType: 'private',
	capacity: {
		numberOfTentSites: 1,
		acreage: 2
	},
	attributes: defaultAttributes,
	active: true
};
export const EmptyCampsite: Campsite = EmptyNewCampsite;

export const defaultFilter: AttributeFilters = {
	feature: ['default', 'river', 'mountain', 'lake', 'sea', 'wildlife', 'hikingTrails', 'forest'],
	amenity: ['cellSignal', 'wifi', 'toilet', 'portAPotty', 'bathroom', 'shower', 'firepit', 'barbeque'],
	permitted: ['pets', 'campfire', 'fishing', 'climbing', 'swimming', 'woodGathering', 'hunting']
};
