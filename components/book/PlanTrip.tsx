// eslint-disable-next-line css-modules/no-unused-class
import Button from '@components/Forms/Button';
import useGetCounterField from '@components/Framework/useGetCounterField';
import useDatetimeModal from '@hooks/useDatetimeModal';
import { FormValueType, FormValuesType } from '@hooks/useFormValues';
import { Campsite } from '@model/campsite';
import { addDays, dateSmall, getLocalDay } from '@model/date';
import { Trip } from '@model/trips';
import defaultImage from 'assets/defaultCampsite.png';
import classNames from 'classnames';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './PlanTrip.module.css';
export const PlanTrip = ({
	trip,
	setValues,
	formValues,
	stage,
	campsite,
	goToNextStage
}: {
	trip?: Trip | null | undefined;
	setValues: (value: FormValueType<Trip>) => void;
	formValues: FormValuesType<Trip> | undefined;
	stage: number;
	campsite: Campsite | null;
	goToNextStage: (page: number) => Promise<void>;
}) => {
	const image = campsite?.images?.[0];
	const [startDate, setStartDate] = useState<string>(dateSmall(getLocalDay()) || '');
	const [endDate, setEndDate] = useState<string>(dateSmall(addDays(getLocalDay(), 1)) || '');
	const handleStartDateSelect = (selectedDatetime: string) => {
		setStartDate(dateSmall(selectedDatetime || getLocalDay()));
	};
	const handleEndDateSelect = (selectedDatetime: string) => {
		setEndDate(dateSmall(selectedDatetime || addDays(getLocalDay(), 1)));
	};
	const { presentDatetimeModal: presentStartTimeModal } = useDatetimeModal({
		onDatetimeChange: handleStartDateSelect,
		disabledDates: []
	});
	const { presentDatetimeModal: presentEndTimeModal } = useDatetimeModal({
		onDatetimeChange: handleEndDateSelect,
		disabledDates: []
	});

	const { count: countAdults, CounterComponent: AdultsCounter } = useGetCounterField({
		value: 1,
		max: 19,
		title: 'Adults',
		subtitle: 'Ages 13 or above'
	});
	const { count: countKids, CounterComponent: KidsCounter } = useGetCounterField({
		value: 1,
		max: 20,
		title: 'Children',
		subtitle: '12 and Under'
	});
	const { count: countPets, CounterComponent: PetsCounter } = useGetCounterField({
		value: 1,
		max: 20,
		title: 'Pets',
		subtitle: 'Dogs, cats or chickens',
		noline: true
	});

	useEffect(() => {
		console.log('AdultCount Changed');
		setValues({
			capacity: { adults: countAdults, children: countKids, pets: countPets },
			checkin: startDate,
			checkout: endDate
		});
	}, [countAdults, countKids, countPets, startDate, endDate, setValues]);

	return (
		<div key={'stage1'} className={styles.container}>
			<h1 className="bold">Plan your trip</h1>
			<div className="space10" />
			<p>Provide the details of your visit and send your request to the campsite owner</p>
			<div className="space10" />
			<div className="card">
				<div className={styles.campsitePreview}>
					<div className={styles.campsiteImage}>
						<Image
							src={image ? `/api/images/${image?.id}.${image?.contentType.split('/')[1]}` : defaultImage}
							alt="Campsite Image"
							fill
							style={{ objectFit: 'cover' }}
						/>
					</div>
					<div className={styles.camspiteInfo}>
						<div>Where</div>
						<h5 className={styles.campsiteTitle}>{campsite?.title}</h5>
						<div className="space10"></div>
						<div className={classNames('callout', styles.campsiteDescription)}>
							A nice campsite in the picturesque rocky mountains
						</div>
					</div>
				</div>
			</div>
			<div className="space30" />
			<div className="card">
				<div className={classNames(styles.datePickerContainer, 'callout')}>
					<div>When</div>
					<div className={classNames(styles.dualDates, 'bold')}>
						<div className="chip" onClick={presentStartTimeModal}>
							{startDate}
						</div>
						<span>-</span>
						<div className="chip" onClick={presentEndTimeModal}>
							{endDate}
						</div>
					</div>
				</div>
			</div>
			<div className="space30" />
			<div className="card">
				<div>
					<div className="space10" />
					<h5 className="bold">{`Who's going?`}</h5>
					<div className="space10" />
					{AdultsCounter}
					<div className="space10" />
					{KidsCounter}
					<div className="space10" />
					{PetsCounter}
				</div>
			</div>
			<div className="space20" />
			<Button
				color="primary"
				fill="solid"
				size="default"
				className="radius8"
				expand="block"
				onClick={() => goToNextStage(1)}
			>
				Proceed to payment details
			</Button>
		</div>
	);
};
