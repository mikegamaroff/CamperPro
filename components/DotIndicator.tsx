import classNames from 'classnames';
// eslint-disable-next-line css-modules/no-unused-class
import sharedStyles from '../styles/shared.module.css';

export const DotIndicator: React.FC<{
	on?: boolean;
	disabled?: boolean;
}> = ({ on = true, disabled = false }) => {
	return (
		<div className={classNames(sharedStyles.dotIndicator, disabled && sharedStyles.dotIndicatorDisabled)}>
			<div className={sharedStyles.dotIndicatorInner} style={{ opacity: on ? 1 : 0 }} />
		</div>
	);
};
