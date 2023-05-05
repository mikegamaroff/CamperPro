// useDatetimeModal.ts
import DateTimePicker from '../components/DateTimePicker';
import useModal from './useModal';

interface UseDatetimeModalProps {
	onDatetimeChange: (value: string) => void;
}

const useDatetimeModal = ({ onDatetimeChange }: UseDatetimeModalProps) => {
	const { presentModal, dismissModal } = useModal({
		onCancel: () => {
			dismissModal();
		},
		onConfirm: () => {
			dismissModal();
		},
		component: <DateTimePicker onDatetimeChange={onDatetimeChange} />,
		type: 'lite'
	});

	return { presentDatetimeModal: presentModal };
};

export default useDatetimeModal;
