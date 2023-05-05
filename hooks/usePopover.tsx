import { useCallback, useRef, useState } from 'react';

interface UsePopoverProps {
	content: HTMLElement;
}

const usePopover = ({ content }: UsePopoverProps) => {
	const [popover, setPopover] = useState<HTMLIonPopoverElement | null>(null);
	const popoverRef = useRef<HTMLIonPopoverElement | null>(null);

	const presentPopover = useCallback(
		async (event: Event) => {
			if (!popover) {
				const p = document.createElement('ion-popover') as HTMLIonPopoverElement;

				p.component = content;
				p.event = event;

				document.body.appendChild(p);

				setPopover(p);
				popoverRef.current = p;
				await p.present();
			} else {
				popover.event = event;
				popover.present();
			}
		},
		[popover, content]
	);

	const dismissPopover = useCallback(() => {
		popoverRef.current?.dismiss();
	}, [popover]);

	return { presentPopover, dismissPopover };
};

export default usePopover;
