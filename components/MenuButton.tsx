import useMenu from '../hooks/useMenu';
import { IconButton } from './Forms/IconButton';
import { IconMenu } from './Icons';

export const MenuButton: React.FC = () => {
	const { openMenu } = useMenu();
	return <IconButton size="small" icon={<IconMenu />} onClick={openMenu} />;
};
