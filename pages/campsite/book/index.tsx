import { Container } from '@components/Container';
import Button from '@components/Forms/Button';
import { IconButton } from '@components/Forms/IconButton';
import { Header } from '@components/Header';
import { IconClose } from '@components/Icons';
import { Pager } from '@components/Pager';
import { CREATE_TRIP_PAGE_TRIP, CreateTripStages } from '@components/book/CreateTripStages';
import { CampsiteContext } from '@context/campsiteContext';
import { TripContext } from '@context/tripContext';
import { useFormValues } from '@hooks/useFormValues';
import { objectEquals } from '@model/model';
import { EmptyNewTrip, Trip } from '@model/trips';
import withAuth from '@pages/withAuth';
import { useAddTrip } from '@routes/useAddTrip';
import { useGetCampsite } from '@routes/useGetCampsite';
import { TripEditRules } from 'formConfigs/editTripFieldsConfig';
import { useContext, useState } from 'react';

interface Props {
	id: string;
}

function PlanBooking({ id }: Props) {
	const { campsite, isLoading, isError } = useGetCampsite(id);
	const { addTrip, isLoading: addCampsiteLoading, isSuccess } = useAddTrip();
	const {
		setValues,
		formValues,
		stateDataObject: newTrip
	} = useFormValues<Trip>(TripEditRules, EmptyNewTrip, objectEquals);
	const { updateCampsite } = useContext(CampsiteContext);
	const { trips, setTrips } = useContext(TripContext);
	const [stage, setStage] = useState<number>(0);
	const goToNextStage = async (page: number) => {
		setStage(page);
	};

	const totalPages = CREATE_TRIP_PAGE_TRIP;

	const handleAddTrip = async () => {
		if (newTrip) {
			try {
				const { response, campsite } = await addTrip(newTrip);

				if (campsite) {
					updateCampsite(campsite);
				}

				if (response.success) {
					setTrips([newTrip, ...trips]);
				} else {
					console.error('Error adding campsite:', response.message);
				}
			} catch (error) {
				console.error('Error adding campsite:', error instanceof Error ? error.message : 'Unknown error');
			}
		}
	};

	const BookButton = () => {
		return stage === totalPages - 1 ? (
			<Button color="primary" fill="solid" size="small" onClick={handleAddTrip}>
				Book
			</Button>
		) : (
			<Button color="primary" fill="solid" size="small" onClick={() => goToNextStage(1)}>
				Proceed
			</Button>
		);
	};
	return (
		<>
			<Header
				title="Request Booking"
				left={<IconButton icon={<IconClose />} onClick={() => history.go(-1)} />}
				right={<BookButton />}
			/>
			{campsite && (
				<>
					<Pager page={stage} draftMode={campsite.draft} totalPages={totalPages} onClick={goToNextStage} />
					<Container hidetabs scroll footer shelfHeight={125}>
						<CreateTripStages
							stage={stage}
							trip={newTrip}
							campsite={campsite}
							setValues={setValues}
							formValues={formValues}
							goToNextStage={goToNextStage}
							handleAddTrip={handleAddTrip}
						/>
					</Container>
				</>
			)}
		</>
	);
}

export default withAuth(PlanBooking);
