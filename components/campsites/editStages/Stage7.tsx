import { BlackBullet } from '@components/BlackBullet';
import { FormTextarea } from '@components/Forms/FormTextarea';
import { FormValueType, FormValuesType } from '@hooks/useFormValues';
import { Campsite } from '@model/campsite';
import React from 'react';
import styles from './stages.module.css';

interface StageProps<T> {
	campsite?: Campsite | null | undefined;
	setValues: (value: FormValueType<T>) => void;
	formValues: FormValuesType<Campsite> | null | undefined;
}

export const Stage7: React.FC<StageProps<Campsite>> = ({ campsite, setValues, formValues }) => {
	return (
		<div>
			<BlackBullet label="Host's Rules" number={7} />
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
