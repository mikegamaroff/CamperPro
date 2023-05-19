import classNames from 'classnames';
import { FC } from 'react';
import useModal from '../hooks/useModal';
import styles from './FeedSearchButton.module.css';
import { IconFilter, IconSearch } from './Icons';

export const FeedSearchButton: FC = () => {
	const ModalContent = () => {
		return (
			<div>
				<h2>Filters</h2>
				<p>Filters</p>
			</div>
		);
	};
	const confirmModal = () => {
		console.log('Confirmed');
		dismissModal();
	};

	const cancelModal = () => {
		console.log('Canceled');
		dismissModal();
	};
	const { presentModal, dismissModal } = useModal({
		onCancel: cancelModal,
		onConfirm: confirmModal,
		component: <ModalContent />
	});

	return (
		<div className={styles.FeedSearchButtonContainer}>
			<div className={styles.FeedSearchButtonContent}>
				<div>
					<IconSearch size={21} />
				</div>
				<div className={classNames(styles.label, 'h5-bold')}>Find a campsite</div>
				<div onClick={presentModal} className={styles.FilterButton}>
					<IconFilter size={20} />
				</div>
			</div>
		</div>
	);
};
