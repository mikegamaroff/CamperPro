import { ComponentType } from 'react';
import Add from '../../assets/icons/AddIcon.component.svg';
import BackArrow from '../../assets/icons/BackArrowIcon.component.svg';
import Camera from '../../assets/icons/CameraIcon.component.svg';
import Check from '../../assets/icons/CheckIcon.component.svg';
import ChevronDown from '../../assets/icons/ChevronDown.component.svg';
import ChevronForward from '../../assets/icons/ChevronForward.component.svg';
import ClearFilters from '../../assets/icons/ClearFiltersIcon.component.svg';
import Close from '../../assets/icons/CloseIcon.component.svg';
import Edit from '../../assets/icons/EditIcon.component.svg';
import Eye from '../../assets/icons/EyeIcon.component.svg';
import EyeOff from '../../assets/icons/EyeOffIcon.component.svg';
import Filter from '../../assets/icons/FilterIcon.component.svg';
import ForwardArrow from '../../assets/icons/ForwardArrowIcon.component.svg';
import Home from '../../assets/icons/HomeIcon.component.svg';
import Location from '../../assets/icons/LocationIcon.component.svg';
import Logout from '../../assets/icons/LogoutIcon.component.svg';
import Map from '../../assets/icons/MapIcon.component.svg';
import Menu from '../../assets/icons/MenuIcon.component.svg';
import Minus from '../../assets/icons/MinusIcon.component.svg';
import Note from '../../assets/icons/NoteIcon.component.svg';
import Search from '../../assets/icons/SearchIcon.component.svg';
import Star from '../../assets/icons/StarIcon.component.svg';
import Trash from '../../assets/icons/TrashIcon.component.svg';
import Trips from '../../assets/icons/TripsIcon.component.svg';
import TripsSolid from '../../assets/icons/TripsSolidIcon.component.svg';
import Profile from '../../assets/icons/UserIcon.component.svg';
import Barbecue from '../../assets/icons/categories/BarbecueIcon.component.svg';
import Cellsignal from '../../assets/icons/categories/CellsignalIcon.component.svg';
import Climbing from '../../assets/icons/categories/ClimbingIcon.component.svg';
import Firepit from '../../assets/icons/categories/FirepitIcon.component.svg';
import Fishing from '../../assets/icons/categories/FishingIcon.component.svg';
import Forest from '../../assets/icons/categories/ForestIcon.component.svg';
import Hiking from '../../assets/icons/categories/HikingIcon.component.svg';
import Hunting from '../../assets/icons/categories/HuntingIcon.component.svg';
import Lake from '../../assets/icons/categories/LakeIcon.component.svg';
import Mountain from '../../assets/icons/categories/MountainIcon.component.svg';
import Pets from '../../assets/icons/categories/PetsIcon.component.svg';
import Portapot from '../../assets/icons/categories/PortapotIcon.component.svg';
import River from '../../assets/icons/categories/RiverIcon.component.svg';
import Sea from '../../assets/icons/categories/SeaIcon.component.svg';
import Shower from '../../assets/icons/categories/ShowerIcon.component.svg';
import Swimming from '../../assets/icons/categories/SwimmingIcon.component.svg';
import Toilet from '../../assets/icons/categories/ToiletIcon.component.svg';
import Wifi from '../../assets/icons/categories/WifiIcon.component.svg';
import Wildlife from '../../assets/icons/categories/WildlifeIcon.component.svg';
import Woodgathering from '../../assets/icons/categories/WoodgatheringIcon.component.svg';
import { AmenityNames, FeatureNames, PermittedNames } from '../../model/campsite';
import { Icon } from './Icon';
export interface IconProps {
	size?: number;
}

const createIcon = (SvgComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>, key: string) => {
	const IconComponent = ({ size = 24 }: IconProps) => (
		<Icon size={size}>
			<SvgComponent />
		</Icon>
	);
	IconComponent.displayName = key;
	return IconComponent;
};
export const IconTrash = createIcon(Trash, 'Trash');
export const IconClearFilters = createIcon(ClearFilters, 'ClearFilters');
export const IconEye = createIcon(Eye, 'Eye');
export const IconEyeOff = createIcon(EyeOff, 'EyeOff');
export const IconCellsignal = createIcon(Cellsignal, 'Cellsignal');
export const IconWildlife = createIcon(Wildlife, 'Wildlife');
export const IconRiver = createIcon(River, 'River');
export const IconPets = createIcon(Pets, 'Pets');
export const IconSea = createIcon(Sea, 'Sea');
export const IconCamera = createIcon(Camera, 'Camera');
export const IconMountain = createIcon(Mountain, 'Mountain');
export const IconLake = createIcon(Lake, 'Lake');
export const IconHunting = createIcon(Hunting, 'Hunting');
export const IconHiking = createIcon(Hiking, 'Hiking');
export const IconForest = createIcon(Forest, 'Forest');
export const IconFishing = createIcon(Fishing, 'Fishing');
export const IconClimbing = createIcon(Climbing, 'Climbing');
export const IconFirepit = createIcon(Firepit, 'Firepit');
export const IconSearch = createIcon(Search, 'Search');
export const IconCheck = createIcon(Check, 'Check');
export const IconEdit = createIcon(Edit, 'Edit');
export const IconTrips = createIcon(Trips, 'Trips');
export const IconTripsSolid = createIcon(TripsSolid, 'TripsSolid');
export const IconProfile = createIcon(Profile, 'Profile');
export const IconClose = createIcon(Close, 'Close');
export const IconMenu = createIcon(Menu, 'Menu');
export const IconAdd = createIcon(Add, 'Add');
export const IconBackArrow = createIcon(BackArrow, 'BackArrow');
export const IconForwardArrow = createIcon(ForwardArrow, 'ForwardArrow');
export const IconFilter = createIcon(Filter, 'Filter');
export const IconStar = createIcon(Star, 'Star');
export const IconLocation = createIcon(Location, 'Location');
export const IconChevronForward = createIcon(ChevronForward, 'ChevronForward');
export const IconChevronDown = createIcon(ChevronDown, 'ChevronDown');
export const IconMap = createIcon(Map, 'Map');
export const IconMinus = createIcon(Minus, 'Minus');
export const IconNote = createIcon(Note, 'SelfCheckin');
export const IconHome = createIcon(Home, 'ReceptionCheckin');
export const IconWifi = createIcon(Wifi, 'Wifi');
export const IconToilet = createIcon(Toilet, 'Toilet');
export const IconPortapot = createIcon(Portapot, 'Portapot');
export const IconShower = createIcon(Shower, 'Shower');
export const IconBarbecue = createIcon(Barbecue, 'Barbecue');
export const IconSwimming = createIcon(Swimming, 'Swimming');
export const IconWoodgathering = createIcon(Woodgathering, 'Swimming');
export const IconLogout = createIcon(Logout, 'Logout');
export const iconComponents: Record<
	FeatureNames | AmenityNames | PermittedNames,
	{ icon: ComponentType<IconProps>; label: string }
> = {
	river: { icon: IconRiver, label: 'River' },
	cellsignal: { icon: IconCellsignal, label: 'Cellular' },
	wildlife: { icon: IconWildlife, label: 'Wildlife' },
	mountain: { icon: IconMountain, label: 'Mountain' },
	lake: { icon: IconLake, label: 'Lake' },
	sea: { icon: IconSea, label: 'Sea' },
	hunting: { icon: IconHunting, label: 'Hunting' },
	hiking: { icon: IconHiking, label: 'Hiking' },
	forest: { icon: IconForest, label: 'Forest' },
	fishing: { icon: IconFishing, label: 'Fishing' },
	climbing: { icon: IconClimbing, label: 'Climbing' },
	firepit: { icon: IconFirepit, label: 'Firepit' },
	default: { icon: IconHome, label: 'Default' },
	wifi: { icon: IconWifi, label: 'Wifi' },
	toilet: { icon: IconToilet, label: 'Toilet' },
	portapot: { icon: IconPortapot, label: 'Portapot' },
	shower: { icon: IconShower, label: 'Shower' },
	barbecue: { icon: IconBarbecue, label: 'BBQ' },
	pets: { icon: IconPets, label: 'Pets' },
	campfire: { icon: IconFirepit, label: 'Campfire' },
	swimming: { icon: IconSwimming, label: 'Swimming' },
	woodgathering: { icon: IconWoodgathering, label: 'Wood gathering' }
};
