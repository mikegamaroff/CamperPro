// useDatetimeModal.ts
import DateTimePicker from '../components/DateTimePicker';
import useModal from './useModal';

interface UseDatetimeModalProps {
	onDatetimeChange: (value: string) => void;
	disabledDates: string[];
}

const useDatetimeModal = ({ onDatetimeChange, disabledDates }: UseDatetimeModalProps) => {
	const { presentModal, dismissModal } = useModal({
		onCancel: () => {
			dismissModal();
		},
		onConfirm: () => {
			dismissModal();
		},
		component: <DateTimePicker onDatetimeChange={onDatetimeChange} disabledDates={disabledDates} />,
		type: 'lite'
	});

	return { presentDatetimeModal: presentModal };
};

export default useDatetimeModal;
