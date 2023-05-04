import Image, { StaticImageData } from 'next/image';
import { Icon } from './Icon';

import Eye from '../../assets/icons/EyeIcon.svg';
import EyeOff from '../../assets/icons/EyeOffIcon.svg';
import Cellsignal from '../../assets/icons/categories/CellsignalIcon.svg';
import Climbing from '../../assets/icons/categories/ClimbingIcon.svg';
import Fire from '../../assets/icons/categories/FireIcon.svg';
import Fishing from '../../assets/icons/categories/FishingIcon.svg';
import Forest from '../../assets/icons/categories/ForestIcon.svg';
import Hiking from '../../assets/icons/categories/HikingIcon.svg';
import Hunting from '../../assets/icons/categories/HuntingIcon.svg';
import Lake from '../../assets/icons/categories/LakeIcon.svg';
import Mountain from '../../assets/icons/categories/MountainIcon.svg';
import Ocean from '../../assets/icons/categories/OceanIcon.svg';
import Pets from '../../assets/icons/categories/PetsIcon.svg';
import River from '../../assets/icons/categories/RiverIcon.svg';
import Wildlife from '../../assets/icons/categories/WildlifeIcon.svg';

interface IconProps {
	size?: number;
}

interface IconMap {
	[key: string]: StaticImageData;
}

const iconMap: IconMap = {
	Eye,
	EyeOff,
	Cellsignal,
	Climbing,
	Fire,
	Fishing,
	Forest,
	Hiking,
	Hunting,
	Lake,
	Mountain,
	Ocean,
	Pets,
	River,
	Wildlife
};
const createIcon = (name: string, key: string) => {
	const src = iconMap[key];
	const IconComponent = ({ size }: IconProps) => (
		<Icon size={size}>
			<Image src={src} alt={name} width={size || 30} height={size || 30} />
		</Icon>
	);
	IconComponent.displayName = name;
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
