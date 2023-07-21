import { Container } from '@components/Container';
import { IconButton } from '@components/Forms/IconButton';
import { Header } from '@components/Header';
import { IconBackArrow, IconClose } from '@components/Icons';
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
	const goToNextStage = async (page: number) => {
		setStage(page);
	};

	const stages = [
		<PlanTrip key="stage1" campsite={campsite} goToNextStage={goToNextStage} />,
		<div key={'stage2'}>Stage 2</div>
	];

	return (
		<>
			<Header
				title="Plan your trip"
				left={
					stage === 1 ? (
						<IconButton icon={<IconClose />} onClick={() => history.go(-1)} />
					) : (
						<IconButton icon={<IconBackArrow />} onClick={() => goToNextStage(1)} />
					)
				}
			/>
			<Pager page={stage} draftMode={false} totalPages={totalPages} onClick={goToNextStage} />
			<Container hidetabs scroll shelfHeight={125}>
				{stages[stage - 1]}
			</Container>
		</>
	);
}

export default withAuth(RequestBooking);
