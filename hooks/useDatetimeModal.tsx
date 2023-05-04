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

			const datetime = React.createElement('ion-datetime', {
				'show-default-buttons': true,
				ionChange: (event: React.FormEvent<HTMLIonDatetimeElement>) => {
					const newValue = event.currentTarget.value as string;
					onDatetimeChange(newValue);
					container.style.display = 'none';
				}
			});

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
