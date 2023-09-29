import { BlackBullet } from '@components/BlackBullet';
import Checkbox from '@components/Forms/Checkbox';
import { Input } from '@components/Forms/Input';
import Select from '@components/Forms/Select';
import { FormValueType } from '@hooks/useFormValues';
import { Address, CampLocation, Campsite, EmptyCampsiteLocation, StageProps, countryList } from '@model/campsite';
import React, { ChangeEvent, useState } from 'react';
// eslint-disable-next-line css-modules/no-unused-class
import styles from './stages.module.css';
export const WhereIsIt: React.FC<StageProps<Campsite>> = ({ campsite, setValues, formValues, stage }) => {
	const [location, setLocation] = useState<CampLocation>(EmptyCampsiteLocation);
	const [address, setAddress] = useState<Address | null>(EmptyCampsiteLocation.receptionAddress);

	const handleSetLocationField = (e: ChangeEvent<HTMLInputElement>) => {
		const updatedLocation: CampLocation = { ...location, [e.target.id]: e.target.value };
		setLocation(updatedLocation);
		formValues &&
			setValues({
				location: updatedLocation
			} as FormValueType<Campsite>);
	};

	const handleSetAddressField = (e: ChangeEvent<HTMLInputElement>) => {
		const updatedAddress: Address = { ...address, [e.target.id]: e.target.value };
		setAddress(updatedAddress);
		formValues &&
			setValues({
				location: { receptionAddress: updatedAddress }
			} as FormValueType<Campsite>);
	};

	return (
		<div className="contentWrapper">
			<BlackBullet label="Where is it" number={stage} />
			<div className="space40" />
			{campsite && formValues && (
				<>
					<Select
						id="country"
						options={countryList}
						onChange={handleSetLocationField}
						value={location.country}
						placeholder="Select Country / Region"
						label="Country / Region"
					/>
					<div className="space40" />
					<div className={styles.radioButton}>
						<Checkbox
							id="receptionCheckin"
							checked={formValues.receptionCheckin?.value}
							onIonChange={e =>
								setValues({
									receptionCheckin: e.target.checked
								} as FormValueType<Campsite>)
							}
						/>
						<div>Check in at reception</div>
					</div>
					<div>
						<div className="space20" />
						<Input
							label="Address Line 1"
							placeholder="Address Line 1"
							id="address1"
							value={address?.address1}
							onChange={handleSetAddressField}
						/>
						<div className="space20" />
						<Input
							label="County"
							placeholder="County"
							id="county"
							value={address?.county}
							onChange={handleSetAddressField}
						/>
						<div className="space20" />
						<Input
							label="State / Territory"
							placeholder="State / Territory"
							id="state"
							value={location.state}
							onChange={handleSetLocationField}
						/>
						<div className="space20" />
						<Input
							label="Zip / Post Code"
							placeholder="Zip / Post Code"
							id="zip"
							value={address?.postalCode}
							onChange={handleSetAddressField}
						/>
					</div>
				</>
			)}
		</div>
	);
};
