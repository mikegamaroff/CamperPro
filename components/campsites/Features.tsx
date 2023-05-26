import React from 'react';
import { AttributeNames, Campsite } from '../../model/campsite';
import { iconComponents } from '../Icons';
import styles from './Features.module.css';

interface FeaturesProps {
	campsite: Campsite;
	attributeType: AttributeNames;
}

export const Features: React.FC<FeaturesProps> = ({ campsite, attributeType }) => {
	const attributes = campsite.attributes[attributeType] || null;

	return (
		<div className={styles.featuresContainer}>
			{attributeType === 'feature' && <h4 className="bold">Features</h4>}
			{attributeType === 'amenity' && <h4 className="bold">Amenity</h4>}
			{attributeType === 'permitted' && <h4 className="bold">Permitted</h4>}
			<div className={styles.featuresGrid}>
				{attributes?.map(attribute => {
					const FeatureIcon = iconComponents[attribute].icon;
					return (
						<>
							{attributeType === 'feature' ? (
								<div className={styles.feature} key={attribute}>
									<div>
										<FeatureIcon size={36} />
									</div>
									<div>{iconComponents[attribute].label}</div>
								</div>
							) : (
								<div>Permitted or a Amenity</div>
							)}
						</>
					);
				})}
			</div>
		</div>
	);
};
