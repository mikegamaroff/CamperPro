import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';

type UseAdjustableHeight = (
	showAll: boolean,
	divRef: MutableRefObject<HTMLDivElement | null>,
	setDivHeight: Dispatch<SetStateAction<string>>,
	defaultHeight: string
) => void;

export const useAdjustFilterHeights: UseAdjustableHeight = (showAll, divRef, setDivHeight, defaultHeight) => {
	useEffect(() => {
		if (showAll) {
			const Div = divRef.current;

			if (Div) {
				setDivHeight(`${Div.scrollHeight}px`);
			}
		} else {
			setDivHeight(defaultHeight);
		}
	}, [showAll, divRef, setDivHeight, defaultHeight]);
};
