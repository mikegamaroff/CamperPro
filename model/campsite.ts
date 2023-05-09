import { v4 as uuidv4 } from 'uuid';
import { DocumentWithImages } from './model';
export interface Coordinates {
	lat: number;
	lng: number;
}

export interface Capacity {
	numberOfTentSites: number;
	maxOccupancyPerTentSite: number;
}

export interface Features {
	river: boolean;
	mountain: boolean;
	lake: boolean;
	hunting: boolean;
	sea: boolean;
	wildlife: boolean;
	hikingTrails: boolean;
	forest: boolean;
}

export interface Amenities {
	cellSignal: boolean;
	wifi: boolean;
	toilet: boolean;
	portAPotty: boolean;
	bathroom: boolean;
	shower: boolean;
	firepit: boolean;
	barbeque: boolean;
}

export interface Permitted {
	pets: boolean;
	campfire: boolean;
	fishing: boolean;
	climbing: boolean;
	swimming: boolean;
	woodGathering: boolean;
}

export interface Campsite extends DocumentWithImages {
	_id?: string;
	type: string;
	category: string;
	title: string;
	images: Array<{ id: string; contentType: string }>;
	created_at?: string;
	updated_at?: string;
	draft: boolean;
	coordinates: Coordinates;
	pricePerNight: number;
	campsiteType: 'private' | 'shared';
	capacity: Capacity;
	features: Features;
	amenities: Amenities;
	permitted: Permitted;
	receptionAddress: string;
	numberOfTentSitesAvailable: number;
	active: boolean;
}

export const EmptyNewCampsite: Campsite = {
	_id: `campsite:${uuidv4()}`,
	type: 'campsite',
	category: 'public',
	title: '',
	coordinates: {
		lat: 0,
		lng: 0
	},
	images: [],
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
	draft: true,
	pricePerNight: 0,
	campsiteType: 'private',
	capacity: {
		numberOfTentSites: 1,
		maxOccupancyPerTentSite: 2
	},
	features: {
		river: false,
		mountain: false,
		lake: false,
		hunting: false,
		sea: false,
		wildlife: false,
		hikingTrails: false,
		forest: false
	},
	amenities: {
		cellSignal: false,
		wifi: false,
		toilet: false,
		portAPotty: false,
		bathroom: false,
		shower: false,
		firepit: false,
		barbeque: false
	},
	permitted: {
		pets: false,
		campfire: false,
		fishing: false,
		climbing: false,
		swimming: false,
		woodGathering: false
	},
	receptionAddress: '',
	numberOfTentSitesAvailable: 0,
	active: false
};
export const EmptyCampsite: Campsite = EmptyNewCampsite;
