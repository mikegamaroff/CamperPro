// useDatetimeModal.ts
import DateTimePicker from '../components/DateTimePicker';
import useIonModal from './useIonModal';

interface UseDatetimeModalProps {
	onDatetimeChange: (value: string) => void;
	disabledDates: string[];
}

const useDatetimeModal = ({ onDatetimeChange, disabledDates }: UseDatetimeModalProps) => {
	const { presentModal, dismissModal } = useIonModal({
		onCancel: () => {
			dismissModal();
		},
		onConfirm: () => {
			dismissModal();
		},
		component: <DateTimePicker onDatetimeChange={onDatetimeChange} disabledDates={disabledDates} />
	});

	return { presentDatetimeModal: presentModal };
};

export default useDatetimeModal;
