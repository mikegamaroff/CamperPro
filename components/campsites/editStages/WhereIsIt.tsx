import { BlackBullet } from '@components/BlackBullet';
import { FormSelect } from '@components/Forms/FormSelect';
import { Campsite, StageProps, countryList } from '@model/campsite';
import React from 'react';
export const WhereIsIt: React.FC<StageProps<Campsite>> = ({ campsite, setValues, formValues, stage }) => {
	return (
		<div>
			<BlackBullet label="Where is it" number={stage} />
			<div className="space40" />
			{campsite && formValues && (
				<>
					<div>
						<FormSelect
							id="title"
							options={countryList}
							setValues={setValues}
							field={formValues?.title}
							placeholder="Select Country / Region"
							label="Country / Region"
						/>
					</div>
				</>
			)}
		</div>
	);
};
