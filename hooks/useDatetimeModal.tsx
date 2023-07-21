// useDatetimeModal.ts
import DateTimePicker from '../components/DateTimePicker';
import useIonModal from './useIonModal';

interface UseDatetimeModalProps {
	onDatetimeChange: (value: string) => void;
	disabledDates: string[];
	min?: string;
	max?: string;
}

const useDatetimeModal = ({ onDatetimeChange, disabledDates, min, max }: UseDatetimeModalProps) => {
	const { presentModal, dismissModal } = useIonModal({
		onCancel: () => {
			dismissModal();
		},
		onConfirm: () => {
			dismissModal();
		},
		component: (
			<DateTimePicker onDatetimeChange={onDatetimeChange} disabledDates={disabledDates} min={min} max={max} />
		)
	});

	return { presentDatetimeModal: presentModal };
};

export default useDatetimeModal;
