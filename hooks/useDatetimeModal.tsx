import { motion } from 'framer-motion';
import React, { useCallback, useState } from 'react';
import { createRoot } from 'react-dom/client';

interface UseDatetimeModalProps {
	onDatetimeChange: (value: string) => void;
}

const useDatetimeModal = ({ onDatetimeChange }: UseDatetimeModalProps) => {
	const [datetimePickerContainer, setDatetimePickerContainer] = useState<HTMLDivElement | null>(null);

	const presentDatetimeModal = useCallback(async () => {
		if (!datetimePickerContainer) {
			const container = document.createElement('div') as HTMLDivElement;
			container.className = 'datetime-picker-container';

			const handleIonChange = (event: CustomEvent<{ value: string }>) => {
				onDatetimeChange(event.detail.value);
				container.style.display = 'none';
			};

			const datetime = React.createElement('ion-datetime');
			//	(datetime as unknown as EventTarget).addEventListener('ionChange', handleIonChange);

			const MotionDiv = (
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.9 }}
					transition={{ duration: 0.2 }}
				>
					{datetime}
				</motion.div>
			);

			createRoot(container).render(MotionDiv);
			document.body.appendChild(container);
			setDatetimePickerContainer(container);
		} else {
			datetimePickerContainer.style.display = 'block';
		}
	}, [datetimePickerContainer, onDatetimeChange]);

	return { presentDatetimeModal };
};

export default useDatetimeModal;
