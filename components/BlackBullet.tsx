import React from 'react';

interface FabProps {
	number?: number;
	label: string;
}

export const BlackBullet: React.FC<FabProps> = ({ number, label }) => {
	return (
		<div className="blackBulletContainer">
			<div className="blackBullet">{number}</div>
			<div className="blackBulletLabel">{label}</div>
		</div>
	);
};
