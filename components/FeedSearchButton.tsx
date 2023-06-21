import FeedFilters from '@components/FeedFilters';
import classNames from 'classnames';
import { FC } from 'react';
import useModal from '../hooks/useModal';
import styles from './FeedSearchButton.module.css';
import { IconFilter, IconSearch } from './Icons';

export const FeedSearchButton: FC = () => {
	const confirmModalSearch = () => {
		console.log('Confirmed');
		dismissModal();
	};

	const cancelModalSearch = () => {
		console.log('Canceled');
		dismissModal();
	};

	const { Modal, presentModal, dismissModal } = useModal({
		onCancel: cancelModalSearch,
		onConfirm: confirmModalSearch,
		component: <FeedFilters />,
		title: 'My Modal'
	});
	return (
		<div className={styles.FeedSearchButtonContainer}>
			{Modal}
			<div onClick={presentModal} className={styles.FeedSearchButtonShadow}>
				<div className={styles.FeedSearchButtonContent}>
					<div>
						<IconSearch size={25} />
					</div>
					<div className={classNames(styles.label, 'body', 'bold')}>Find a campsite</div>

					<div className={styles.FilterButton} onClick={presentModal}>
						<IconFilter size={25} />
					</div>
				</div>
			</div>
		</div>
	);
};
