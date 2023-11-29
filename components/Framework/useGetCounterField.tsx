import { IconAdd, IconMinus } from '@components/Icons';
import classNames from 'classnames';
import { useState } from 'react';
import styles from './useGetCounterField.module.css';

type StarRatingProps = {
	value?: number;
	max?: number;
	min?: number;
	title: string;
	subtitle?: string;
	noline?: boolean;
};

const useGetCounterField = ({ value = 0, max = 20, min = 0, title, subtitle, noline }: StarRatingProps) => {
	const [count, setCount] = useState<number>(value);
	const [isMouseDown, setIsMouseDown] = useState<string | null>(null);

	const handlePlus = () => {
		if (count < max) {
			setCount(prevCount => prevCount + 1);
		}
	};

	const handleMinus = () => {
		if (count > min) {
			setCount(prevCount => prevCount - 1);
		}
	};

	const handleMouseDown = (action: string) => {
		setIsMouseDown(action);
	};

	const handleMouseUp = () => {
		setIsMouseDown(null);
	};

	const CounterComponent = (
		<div className={styles.counterContainer} style={{ borderWidth: noline ? '0px' : '1px' }}>
			<div className={styles.labelContainer}>
				<div className={classNames('medium', styles.title)}>{title}</div>
				{subtitle && <div className={styles.subtitle}>{subtitle}</div>}
			</div>
			<div className={styles.countContainer}>
				<div
					className={classNames(
						styles.controlIcon,
						count === min && styles.countIconDisabled,
						isMouseDown === 'minus' && styles.controlIconPressed
					)}
					onMouseDown={() => handleMouseDown('minus')}
					onMouseUp={handleMouseUp}
					onClick={handleMinus}
				>
					<IconMinus />
				</div>
				<div className={classNames(styles.count, 'bold')}>{count}</div>
				<div
					className={classNames(
						styles.controlIcon,
						count >= max && styles.countIconDisabled,
						isMouseDown === 'plus' && styles.controlIconPressed
					)}
					onMouseDown={() => handleMouseDown('plus')}
					onMouseUp={handleMouseUp}
					onClick={handlePlus}
				>
					<IconAdd />
				</div>
			</div>
		</div>
	);

	return { count, CounterComponent };
};

export default useGetCounterField;
