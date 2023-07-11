import { FilterContext } from '@context/filterContext';
import { filterExists } from '@utils/filterExists';
import classNames from 'classnames';
import { FC, useContext } from 'react';
import { FilterButtons, FilterIconProps } from '../model/campsite';
import styles from './FilterBar.module.css';

export const FilterBar: FC = () => {
	const { handleSelectAttributes } = useContext(FilterContext);
	return (
		<div className={styles.container}>
			{FilterButtons.map((filterbutton: FilterIconProps, i: number) => {
				const IconComponent = filterbutton.icon || null;
				return (
					<div
						key={'filterbutton' + i}
						onClick={() => handleSelectAttributes(filterbutton.id)}
						className={classNames(
							filterExists(filterbutton.id) ? styles.buttonSelected : styles.buttonDefault
						)}
					>
						<IconComponent />
						<div className="caption medium">{filterbutton.label}</div>
						<div className={filterExists(filterbutton.id) ? styles.line : styles.lineBlank} />
					</div>
				);
			})}
		</div>
	);
};
