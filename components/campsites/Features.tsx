import React from 'react';
import { Campsite, FeatureNames } from '../../model/campsite';
import { IconForest, IconHiking, IconLake, IconMountain, IconRiver, IconSea, IconWildlife } from '../Icons';
import styles from './Features.module.css';

interface CampFeaturesProps {
	icon: JSX.Element;
	label: string;
	id: FeatureNames;
}

const CampFeatures: CampFeaturesProps[] = [
	{
		label: 'River',
		icon: <IconRiver size={36} />,
		id: 'river'
	},
	{
		label: 'Mountain',
		icon: <IconMountain size={36} />,
		id: 'mountain'
	},
	{
		label: 'Lake',
		icon: <IconLake size={36} />,
		id: 'lake'
	},
	{
		label: 'Sea',
		icon: <IconSea size={36} />,
		id: 'sea'
	},
	{
		label: 'Wildlife',
		icon: <IconWildlife size={36} />,
		id: 'wildlife'
	},
	{
		label: 'Hiking',
		icon: <IconHiking size={36} />,
		id: 'hikingTrails'
	},
	{
		label: 'Forest',
		icon: <IconForest size={36} />,
		id: 'forest'
	}
];

interface FeaturesProps {
	campsite: Campsite;
}

export const Features: React.FC<FeaturesProps> = ({ campsite }) => {
	const features = campsite.attributes.feature || [];

	return (
		<div className={styles.featuresContainer}>
			<h4 className="bold">Features</h4>
			<div className={styles.featuresGrid}>
				{features.map(feature => {
					const MatchFeature = CampFeatures.find(item => item.id === feature);
					return (
						<div className={styles.feature} key={feature}>
							<div>{MatchFeature?.icon}</div>
							<div>{MatchFeature?.label}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
