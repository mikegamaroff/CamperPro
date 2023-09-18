import { BlackBullet } from '@components/BlackBullet';
import Select from '@components/Forms/Select';
import { FormValueType } from '@hooks/useFormValues';
import { CampLocation, Campsite, EmptyCampsiteLocation, StageProps, countryList } from '@model/campsite';
import React, { useState } from 'react';
export const WhereIsIt: React.FC<StageProps<Campsite>> = ({ campsite, setValues, formValues, stage }) => {
	const [country, setCountry] = useState<string>('');
	const [tmpLocation, setTmpLocation] = useState<CampLocation>(EmptyCampsiteLocation);

	const handleSetCountry = (e: CustomEvent) => {
		setCountry(e.detail.value);
		const updatedLocation = { ...tmpLocation, country: e.detail.value };
		setTmpLocation(updatedLocation);
		formValues &&
			setValues({
				location: updatedLocation
			} as FormValueType<Campsite>);
	};
	return (
		<div>
			<BlackBullet label="Where is it" number={stage} />
			<div className="space40" />
			{campsite && formValues && (
				<>
					<div>
						<Select
							id="location"
							options={countryList}
							onChange={handleSetCountry}
							value={country}
							placeholder="Select Country / Region"
							label="Country / Region"
						/>
					</div>
				</>
			)}
		</div>
	);
};
