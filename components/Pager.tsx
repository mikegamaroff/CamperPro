import React from 'react';
// eslint-disable-next-line css-modules/no-unused-class
import { DotIndicator } from './DotIndicator';
import styles from './Page.module.css';

interface PagerProps {
	page?: number;
	totalPages: number;
	draftMode?: boolean;
	onClick?: (val: number) => void;
	header?: boolean;
}

export const Pager: React.FC<PagerProps> = ({ page, totalPages, onClick, draftMode = true, header = true }) => {
	const handleClick = (i: number) => {
		if (page && ((draftMode && i <= page) || !draftMode) && onClick) {
			onClick && onClick(i);
		}
	};

	const PageNumbers = [];
	for (let i = 1; i < totalPages + 1; i++) {
		PageNumbers.push(
			<>
				<div className={styles.pageNumber} key={i} onClick={() => handleClick(i)}>
					{page && <DotIndicator on={page === i} disabled={draftMode && i > page} />}
				</div>
			</>
		);
	}
	return (
		<div style={{ transform: `translateY(${header ? 45 : 0}px)` }}>
			<div className={styles.pageNumberContainer}>{PageNumbers}</div>
			{page && (
				<div className={styles.pageProgressContainer}>
					<div className={styles.pageProgressIndicator} style={{ width: `${(page / totalPages) * 100}%` }} />
				</div>
			)}
		</div>
	);
};
