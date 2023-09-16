import { BlackBullet } from '@components/BlackBullet';
import { FormTextarea } from '@components/Forms/FormTextarea';
import { Campsite, StageProps } from '@model/campsite';
import React from 'react';
import styles from './stages.module.css';

export const HostRules: React.FC<StageProps<Campsite>> = ({ campsite, setValues, formValues, stage }) => {
	return (
		<div>
			<BlackBullet label="Host's Rules" number={stage} />
			<p className={styles.caption}>
				Any specific rules or considerations you want your campers to know about your property?
			</p>
			{campsite && formValues && (
				<FormTextarea
					setValues={setValues}
					field={formValues?.rules}
					id="rules"
					label="Campsite Rules"
					placeholder="Things you would like campers to know"
				/>
			)}
		</div>
	);
};
