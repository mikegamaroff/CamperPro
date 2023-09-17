import { BlackBullet } from '@components/BlackBullet';
import { FormSelect } from '@components/Forms/FormSelect';
import { Campsite, StageProps } from '@model/campsite';
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
							options={[
								{ value: 'apple', label: 'Apple' },
								{ value: 'banana', label: 'Banana' },
								{ value: 'orange', label: 'Orange' }
							]}
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
