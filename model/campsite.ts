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
	postalCode: string;
	country: string;
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
	receptionAddress: Address | null;
	state: string;
	nearestTown?: string | null;
	directions: string | null;
}
export interface Campsite extends DocumentWithImages {
	author?: string;
	category: string;
	title: string;
	description: string;
	draft: boolean;
	rating?: number | null;
	reviewsCount?: number | null;
	location: CampLocation;
	pricePerNight: number;
	receptionCheckin: boolean;
	private: boolean;
	capacity: Capacity;
	attributes: Attributes;
	active: boolean;
}

export const defaultAttributes: Attributes = {
	feature: ['default']
};
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
	rating: null,
	reviewsCount: null,
	location: {
		state: '',
		nearestTown: null,
		receptionAddress: null,
		coordinates: {
			lat: 0,
			lng: 0
		},
		directions: null
	},
	images: [],
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
	draft: true,
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
