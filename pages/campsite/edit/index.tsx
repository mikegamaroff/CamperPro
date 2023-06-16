import { Container } from '@components/Container';
import { Footer } from '@components/Footer';
import { IconButton } from '@components/Forms/IconButton';
import { Header } from '@components/Header';
import { IconBackArrow, IconClose, IconForwardArrow } from '@components/Icons';
import { Pager } from '@components/Pager';
import { Stage1 } from '@components/campsites/editStages/Stage1';
import { CampsiteContext } from '@context/campsiteContext';
import { useFormValues } from '@hooks/useFormValues';
import { Campsite } from '@model/campsite';
import { objectEquals } from '@model/model';
import withAuth from '@pages/withAuth';
import { useEditCampsite } from '@routes/useEditCampsite';
import { useGetCampsite } from '@routes/useGetCampsite';
import { UserEditRules } from 'formConfigs/editUserFieldsConfig';
import { useContext, useEffect, useState } from 'react';

interface Props {
	id: string;
}

function EditCampsite({ id }: Props) {
	const { updateCampsite } = useContext(CampsiteContext);
	const { editCampsite } = useEditCampsite();
	const totalPages = 6;
	const { campsite, isLoading, isError } = useGetCampsite(id);
	const {
		setValues,
		formValues,
		stateDataObject: newCampsite
	} = useFormValues<Campsite>(UserEditRules, campsite, objectEquals);
	const [hasUpdated, setHasUpdated] = useState(false);

	const stages = [
		<Stage1 campsite={campsite} key={'stage1'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage2'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage3'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage1'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage2'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage3'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage1'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage2'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage3'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage1'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage2'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage3'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage1'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage2'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage3'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage1'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage2'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage3'} setValues={setValues} formValues={formValues} />
	];

	const goToNextStage = async (page?: number) => {
		if (campsite) {
			const nextStage = campsite.draftStage + 1;
			const updatedCampsite = { ...campsite, draftStage: page || nextStage };

			const updated = await editCampsite(updatedCampsite); // Update the campsite in the database
			if (updated.success) {
				updateCampsite(updatedCampsite);
			}
		}
	};
	// This effect is used to set the campsite into the draft mode and reset the draft stage
	useEffect(() => {
		if (campsite && id && !hasUpdated) {
			if (!campsite.draft) {
				campsite.draftStage = 1;
				editCampsite(campsite);
			}
			setHasUpdated(true);
		}
	}, [id, campsite, hasUpdated]);
	return (
		<>
			<Header title="Edit Campsite" left={<IconButton icon={<IconClose />} onClick={() => history.go(-1)} />} />
			<Pager
				page={campsite?.draftStage}
				draftMode={campsite?.draft}
				totalPages={totalPages}
				onClick={goToNextStage}
				header
			/>
			<Container hidetabs scroll footer>
				<>
					{campsite?.draftStage && stages[campsite?.draftStage]}
					<button onClick={() => goToNextStage()}>Next</button>
				</>
			</Container>
			<Footer
				left={
					<IconButton
						icon={<IconBackArrow />}
						onClick={() => {
							if (campsite?.draftStage) {
								campsite?.draftStage < 2 ? history.go(-1) : goToNextStage(campsite?.draftStage - 1);
							}
						}}
					/>
				}
				right={
					<IconButton
						icon={<IconForwardArrow />}
						onClick={() => {
							if (campsite?.draftStage) {
								campsite?.draftStage === totalPages
									? console.log('Save Campsite')
									: goToNextStage(campsite?.draftStage + 1);
							}
						}}
					/>
				}
			/>
		</>
	);
}

export default withAuth(EditCampsite);
