import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';

type UseAdjustableHeight = (
	divRef: MutableRefObject<HTMLDivElement | null>,
	defaultHeight: number,
	attributeType: 'amenity' | 'permitted' | 'feature'
) => {
	setShowAllFeatures: Dispatch<SetStateAction<boolean>>;
	showAllFeatures: boolean;
	featureDivHeight: number;
	setShowAllAmenities: Dispatch<SetStateAction<boolean>>;
	showAllAmenities: boolean;
	amenityDivHeight: number;
	setShowAllPermitted: Dispatch<SetStateAction<boolean>>;
	showAllPermitted: boolean;
	permittedDivHeight: number;
};

export const useAdjustFilterHeights: UseAdjustableHeight = (divRef, defaultHeight, attributeType) => {
	const [showAllFeatures, setShowAllFeatures] = useState(false);
	const [featureDivHeight, setFeatureDivHeight] = useState(defaultHeight);
	const [showAllAmenities, setShowAllAmenities] = useState(false);
	const [amenityDivHeight, setAmenityDivHeight] = useState(defaultHeight);
	const [showAllPermitted, setShowAllPermitted] = useState(false);
	const [permittedDivHeight, setPermittedDivHeight] = useState(defaultHeight);

	useEffect(() => {
		if (attributeType === 'feature') {
			if (showAllFeatures) {
				const Ref = divRef.current;

				if (Ref) {
					setFeatureDivHeight(Ref.scrollHeight);
				}
			} else {
				setFeatureDivHeight(defaultHeight);
			}
		}
		if (attributeType === 'amenity') {
			if (showAllAmenities) {
				const Ref = divRef.current;

				if (Ref) {
					setAmenityDivHeight(Ref.scrollHeight);
				}
			} else {
				setAmenityDivHeight(defaultHeight);
			}
		}
		if (attributeType === 'permitted') {
			if (showAllPermitted) {
				const Ref = divRef.current;

				if (Ref) {
					setPermittedDivHeight(Ref.scrollHeight);
				}
			} else {
				setPermittedDivHeight(defaultHeight);
			}
		}
	}, [showAllFeatures, showAllAmenities, showAllPermitted, divRef, defaultHeight]);

	return {
		setShowAllFeatures,
		showAllFeatures,
		featureDivHeight,
		setShowAllAmenities,
		showAllAmenities,
		amenityDivHeight,
		setShowAllPermitted,
		showAllPermitted,
		permittedDivHeight
	};
};
