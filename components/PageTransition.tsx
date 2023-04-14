import { motion } from 'framer-motion';
import React from 'react';

export const PageTransition: React.FC<{
	children: React.ReactNode;
	routeTransition: boolean;
}> = ({ children, routeTransition }) => {
	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			animate={routeTransition ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 20 }} // Set the exit animation to move to the right
			style={{ height: '100%' }}
			transition={{ duration: 0.2 }}
		>
			{children}
		</motion.div>
	);
};
