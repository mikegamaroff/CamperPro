import Image from "next/image";
import Eye from "../../assets/icons/EyeIcon.svg";
import EyeOff from "../../assets/icons/EyeOffIcon.svg";
import { Icon } from "./Icon";

interface IconProps {
  size?: number;
}

export const EyeIcon = ({ size }: IconProps) => (
  <Icon size={size}>
    <Image src={Eye} alt='Eye' />
  </Icon>
);
export const EyeOffIcon = ({ size }: IconProps) => (
  <Icon size={size}>
    <Image src={EyeOff} alt='Eye Off' />
  </Icon>
);
