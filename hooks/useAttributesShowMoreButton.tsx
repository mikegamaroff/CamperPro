import { MutableRefObject, useEffect, useState } from 'react';

type UseShowMore = (
	divRef: MutableRefObject<HTMLDivElement | null>,
	defaultHeight: number,
	attributeType: 'amenity' | 'permitted'
) => { showMorePermittedButton: boolean; showMoreAmenitiesButton: boolean };

export const useAttributesShowMoreButton: UseShowMore = (divRef, defaultHeight, attributeType) => {
	const [showMorePermittedButton, setShowMorePermittedButton] = useState(false);
	const [showMoreAmenitiesButton, setShowMoreAmenitiesButton] = useState(false);

	useEffect(() => {
		if (divRef.current) {
			if (divRef.current.scrollHeight > defaultHeight) {
				if (attributeType === 'amenity') {
					setShowMoreAmenitiesButton(true);
				}
				if (attributeType === 'permitted') {
					setShowMorePermittedButton(true);
				}
			}
		}
	}, [divRef, setShowMoreAmenitiesButton, setShowMorePermittedButton, defaultHeight]);

	return { showMoreAmenitiesButton, showMorePermittedButton };
};
