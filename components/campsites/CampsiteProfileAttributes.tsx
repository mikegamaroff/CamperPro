import React from 'react';
import { AttributeNames, Campsite } from '../../model/campsite';
import { iconComponents } from '../Icons';
import styles from './CampsiteProfileAttributes.module.css';

interface CampsiteProfileAttributesProps {
	campsite: Campsite;
	attributeType: AttributeNames;
}

export const CampsiteProfileAttributes: React.FC<CampsiteProfileAttributesProps> = ({ campsite, attributeType }) => {
	const attributes = campsite.attributes[attributeType] || null;

	return (
		<div className={styles.featuresContainer}>
			{attributeType === 'feature' && (
				<>
					<h4 className="bold">Features</h4>
					<div className={styles.featuresGrid}>
						{attributes?.map(attribute => {
							if (iconComponents[attribute]) {
								const FeatureIcon = iconComponents[attribute].icon;
								return (
									<div className={styles.feature} key={attribute}>
										<div>
											<FeatureIcon size={36} />
										</div>
										<div>{iconComponents[attribute].label}</div>
									</div>
								);
							}
							return null;
						})}
					</div>
				</>
			)}
			{attributeType === 'amenity' && (
				<>
					<h4 className="bold">Amenities</h4>
					<div className={styles.list}>
						{attributes?.map(attribute => {
							if (iconComponents[attribute]) {
								const AmenityIcon = iconComponents[attribute].icon;
								return (
									<div className={styles.item} key={attribute}>
										<div>
											<AmenityIcon size={30} />
										</div>
										<div>{iconComponents[attribute].label}</div>
									</div>
								);
							}
							return null;
						})}
					</div>
				</>
			)}
			{attributeType === 'permitted' && (
				<>
					<h4 className="bold">What&apos;s allowed</h4>
					<div className={styles.list}>
						{attributes?.map(attribute => {
							if (iconComponents[attribute]) {
								const PermittedIcon = iconComponents[attribute].icon;
								return (
									<div className={styles.item} key={attribute}>
										<div>
											<PermittedIcon size={30} />
										</div>
										<div>{iconComponents[attribute].label}</div>
									</div>
								);
							}
							return null;
						})}
					</div>
				</>
			)}
		</div>
	);
};
