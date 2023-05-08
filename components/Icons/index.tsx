import { Icon } from './Icon';

import Close from '../../assets/icons/CloseIcon.component.svg';
import Eye from '../../assets/icons/EyeIcon.component.svg';
import EyeOff from '../../assets/icons/EyeOffIcon.component.svg';
import Menu from '../../assets/icons/MenuIcon.component.svg';
import Search from '../../assets/icons/SearchIcon.component.svg';
import Trips from '../../assets/icons/TripsIcon.component.svg';
import Profile from '../../assets/icons/UserIcon.component.svg';
import Cellsignal from '../../assets/icons/categories/CellsignalIcon.component.svg';
import Climbing from '../../assets/icons/categories/ClimbingIcon.component.svg';
import Fire from '../../assets/icons/categories/FireIcon.component.svg';
import Fishing from '../../assets/icons/categories/FishingIcon.component.svg';
import Forest from '../../assets/icons/categories/ForestIcon.component.svg';
import Hiking from '../../assets/icons/categories/HikingIcon.component.svg';
import Hunting from '../../assets/icons/categories/HuntingIcon.component.svg';
import Lake from '../../assets/icons/categories/LakeIcon.component.svg';
import Mountain from '../../assets/icons/categories/MountainIcon.component.svg';
import Ocean from '../../assets/icons/categories/OceanIcon.component.svg';
import Pets from '../../assets/icons/categories/PetsIcon.component.svg';
import River from '../../assets/icons/categories/RiverIcon.component.svg';
import Wildlife from '../../assets/icons/categories/WildlifeIcon.component.svg';
interface IconProps {
	size?: number;
}

const createIcon = (SvgComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>, key: string) => {
	const IconComponent = ({ size }: IconProps) => (
		<Icon size={size}>
			<SvgComponent width={size || 30} height={size || 30} />
		</Icon>
	);
	IconComponent.displayName = key;
	return IconComponent;
};

export const IconEye = createIcon(Eye, 'Eye');
export const IconEyeOff = createIcon(EyeOff, 'EyeOff');
export const IconCellsignal = createIcon(Cellsignal, 'Cellsignal');
export const IconWildlife = createIcon(Wildlife, 'Wildlife');
export const IconRiver = createIcon(River, 'River');
export const IconPets = createIcon(Pets, 'Pets');
export const IconOcean = createIcon(Ocean, 'Ocean');
export const IconMountain = createIcon(Mountain, 'Mountain');
export const IconLake = createIcon(Lake, 'Lake');
export const IconHunting = createIcon(Hunting, 'Hunting');
export const IconHiking = createIcon(Hiking, 'Hiking');
export const IconForest = createIcon(Forest, 'Forest');
export const IconFishing = createIcon(Fishing, 'Fishing');
export const IconClimbing = createIcon(Climbing, 'Climbing');
export const IconFire = createIcon(Fire, 'Fire');
export const IconSearch = createIcon(Search, 'Search');
export const IconTrips = createIcon(Trips, 'Trips');
export const IconProfile = createIcon(Profile, 'Profile');
export const IconClose = createIcon(Close, 'Close');
export const IconMenu = createIcon(Menu, 'Menu');
