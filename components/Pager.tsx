import React from 'react';
// eslint-disable-next-line css-modules/no-unused-class
import { DotIndicator } from './DotIndicator';
import styles from './Page.module.css';

interface PagerProps {
	page: number;
	totalPages: number;
	draftMode?: boolean;
	onClick?: (val: number) => void;
}

export const Pager: React.FC<PagerProps> = ({ page, totalPages, onClick, draftMode = true }) => {
	const handleClick = (i: number) => {
		if (Number.isInteger(page) && ((draftMode && i <= page) || !draftMode) && onClick) {
			onClick && onClick(i);
		}
	};

	const PageNumbers = [];
	for (let i = 0; i < totalPages; i++) {
		PageNumbers.push(
			<>
				<div className={styles.pageNumber} key={i} onClick={() => handleClick(i)}>
					{page >= 0 && <DotIndicator on={page === i} disabled={draftMode && i > page} />}
				</div>
			</>
		);
	}
	return (
		<div className={styles.pagerContainer}>
			<div className={styles.pageNumberContainer}>{PageNumbers}</div>
			{page >= 0 && (
				<div className={styles.pageProgressContainer}>
					<div
						className={styles.pageProgressIndicator}
						style={{ width: `${((page + 1) / totalPages) * 100}%` }}
					/>
				</div>
			)}
		</div>
	);
};
