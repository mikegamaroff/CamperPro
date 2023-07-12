import React from 'react';
import { CamprSpinner } from './CamprSpinner';
// eslint-disable-next-line css-modules/no-unused-class
import sharedStyles from '../styles/shared.module.css';
interface ContentPreloaderProps {
	message: string;
}

export const ContentPreloader: React.FC<ContentPreloaderProps> = ({ message }) => {
	return (
		<div className={sharedStyles.noResults}>
			<div className="space40" />
			<CamprSpinner />

			<div className="space20" />
			{<h5>{message}</h5>}
		</div>
	);
};
