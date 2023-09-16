import { Container } from '@components/Container';
import Button from '@components/Forms/Button';
import { IconButton } from '@components/Forms/IconButton';
import { Header } from '@components/Header';
import { IconBackArrow, IconClose } from '@components/Icons';
import { Pager } from '@components/Pager';
import { PlanTrip } from '@components/bookPages/PlanTrip';
import { AuthContext } from '@context/authContext';
import { CampsiteContext } from '@context/campsiteContext';
import { TripContext } from '@context/tripContext';
import { EmptyNewTrip, Trip } from '@model/trips';
import withAuth from '@pages/withAuth';
import { useAddTrip } from '@routes/useAddTrip';
import { useGetCampsite } from '@routes/useGetCampsite';
import { useContext, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Props {
	id: string;
}

function RequestBooking({ id }: Props) {
	const { addTrip, isLoading: addCampsiteLoading, isSuccess } = useAddTrip();
	const { updateCampsite } = useContext(CampsiteContext);
	const { trips, setTrips } = useContext(TripContext);
	const { user } = useContext(AuthContext);
	const [stage, setStage] = useState<number>(0);
	const { campsite, isLoading, isError } = useGetCampsite(id);
	const goToNextStage = async (page: number) => {
		setStage(page);
	};

	const stages = [
		<PlanTrip key="stage1" campsite={campsite} goToNextStage={goToNextStage} />,
		<div key={'stage2'}>Stage 2</div>
	];
	const totalPages = stages.length;
	const newTrip: Trip = useMemo(
		() => ({
			...EmptyNewTrip,
			_id: 'trip:' + uuidv4(),
			campsite: campsite?._id as string,
			camper: user?._id as string
		}),
		[campsite?._id, user?._id]
	);

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
				title="Plan your trip"
				left={
					stage === 0 ? (
						<IconButton icon={<IconClose />} onClick={() => history.go(-1)} />
					) : (
						<IconButton icon={<IconBackArrow />} onClick={() => goToNextStage(stage - 1)} />
					)
				}
				right={<BookButton />}
			/>
			<Pager page={stage} draftMode={false} totalPages={totalPages} onClick={goToNextStage} />
			<Container hidetabs scroll shelfHeight={125}>
				{stages[stage]}
			</Container>
		</>
	);
}

export default withAuth(RequestBooking);
