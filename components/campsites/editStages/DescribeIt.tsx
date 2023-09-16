import { BlackBullet } from '@components/BlackBullet';
import { FormInput } from '@components/Forms/FormInput';
import { FormTextarea } from '@components/Forms/FormTextarea';
import { Campsite, StageProps } from '@model/campsite';
import React from 'react';
export const DescribeIt: React.FC<StageProps<Campsite>> = ({ campsite, setValues, formValues, stage }) => {
	return (
		<div>
			<BlackBullet label="Describe It" number={stage} />
			<div className="space40" />
			{campsite && formValues && (
				<>
					<div>
						<FormInput
							id="title"
							setValues={setValues}
							type="text"
							field={formValues?.title}
							label="Title"
						/>
					</div>
					<div>
						<FormTextarea
							id="description"
							setValues={setValues}
							type="text"
							field={formValues?.description}
							label="Description"
						/>
					</div>
				</>
			)}
		</div>
	);
};
