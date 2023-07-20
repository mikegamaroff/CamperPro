import { Container } from '@components/Container';
import { Footer } from '@components/Footer';
import { IconButton } from '@components/Forms/IconButton';
import { Header } from '@components/Header';
import { IconBackArrow, IconClose, IconForwardArrow } from '@components/Icons';
import { Pager } from '@components/Pager';
import { PlanTrip } from '@components/bookPages/PlanTrip';
import withAuth from '@pages/withAuth';
import { useGetCampsite } from '@routes/useGetCampsite';
import { useState } from 'react';

interface Props {
	id: string;
}

function RequestBooking({ id }: Props) {
	const [stage, setStage] = useState<number>(1);
	const totalPages = 2;
	const { campsite, isLoading, isError } = useGetCampsite(id);
	const stages = [<PlanTrip key="stage1" campsite={campsite} />, <div key={'stage2'}>Stage 2</div>];

	const goToNextStage = async (page: number) => {
		setStage(page);
	};
	// This effect is used to set the campsite into the draft mode and reset the draft stage

	return (
		<>
			<Header title="Plan your trip" left={<IconButton icon={<IconClose />} onClick={() => history.go(-1)} />} />
			<Pager page={stage} draftMode={false} totalPages={totalPages} onClick={goToNextStage} />
			<Container hidetabs scroll footer shelfHeight={125}>
				<>
					{stages[stage - 1]}
					<button onClick={() => goToNextStage(stage + 1)}>Next</button>
				</>
			</Container>
			<Footer
				left={
					<IconButton
						icon={<IconBackArrow />}
						onClick={() => {
							if (stage) {
								stage < 2 ? history.go(-1) : goToNextStage(stage - 1);
							}
						}}
					/>
				}
				right={
					<IconButton
						icon={<IconForwardArrow />}
						onClick={() => {
							if (stage) {
								stage === totalPages ? console.log('Save Campsite') : goToNextStage(stage + 1);
							}
						}}
					/>
				}
			/>
		</>
	);
}

export default withAuth(RequestBooking);
