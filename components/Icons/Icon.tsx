import React from 'react';

interface IconProps {
	size: number;
	children?: React.ReactNode;
}

const iconStyle = (size: number) => {
	return { width: size, height: size };
};

export const Icon: React.FC<IconProps> = ({ size, children }) => {
	return (
		<div style={iconStyle(size)} className="icon">
			{children}
		</div>
	);
};
