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
import { useDeleteTrip } from '@routes/useDeleteTrip';
import { useGetTrip } from '@routes/useGetTrip';
import { TripEditRules } from 'formConfigs/editTripFieldsConfig';
import { GetServerSideProps } from 'next';
import { useContext, useState } from 'react';

interface Props {
	id: string;
}

function PlanBooking({ id }: Props) {
	const { campsite, isLoading, isError } = useGetTrip(id);
	const { addTrip, isLoading: getTripLoading, isSuccess } = useAddTrip();
	const { deleteTrip, isLoading: isDeleting, isError: isDeleteError, isSuccess: deleteSuccess } = useDeleteTrip();
	const {
		setValues,
		formValues,
		stateDataObject: newTrip
	} = useFormValues<Trip>(TripEditRules, EmptyNewTrip, objectEquals);
	const { updateCampsite } = useContext(CampsiteContext);
	const { trips, trip, setTrips } = useContext(TripContext);
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
					console.error('Error booking trip:', response.message);
				}
			} catch (error) {
				console.error('Error booking trip:', error instanceof Error ? error.message : 'Unknown error');
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

	const cancelBooking = async () => {
		history.go(-1);
		if (trip) {
			await deleteTrip(trip._id);
		}
	};

	return (
		<>
			<Header
				title="Request Booking"
				left={<IconButton icon={<IconClose />} onClick={cancelBooking} />}
				right={<BookButton />}
			/>
			{trip && campsite && (
				<>
					<Pager page={stage} totalPages={totalPages} onClick={goToNextStage} />
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

export const getServerSideProps: GetServerSideProps = async context => {
	const { params } = context;

	// Ensure that the id param is a string before we pass it as a prop
	const id = typeof params?.id === 'string' ? params.id : '';

	return {
		props: {
			id
		}
	};
};
export default withAuth(PlanBooking);
