// eslint-disable-next-line css-modules/no-unused-class
import sharedStyles from '../styles/shared.module.css';

export const DotIndicator: React.FC<{
	on?: boolean;
}> = ({ on = true }) => {
	return (
		<div className={sharedStyles.dotIndicator}>
			<div className={sharedStyles.dotIndicatorInner} style={{ opacity: on ? 1 : 0 }} />
		</div>
	);
};
