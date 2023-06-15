import { Stage1 } from '@components/campsites/editStages/Stage1';
import { Stage2 } from '@components/campsites/editStages/Stage2';
import { Stage3 } from '@components/campsites/editStages/Stage3';
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
	const { campsite, isLoading, isError } = useGetCampsite(id);
	const {
		setValues,
		formValues,
		stateDataObject: newCampsite
	} = useFormValues<Campsite>(UserEditRules, campsite, objectEquals);
	const [hasUpdated, setHasUpdated] = useState(false);

	const stages = [
		<Stage1 campsite={campsite} key={'stage1'} setValues={setValues} formValues={formValues} />,
		<Stage2 campsite={campsite} key={'stage2'} setValues={setValues} formValues={formValues} />,
		<Stage3 campsite={campsite} key={'stage3'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage1'} setValues={setValues} formValues={formValues} />,
		<Stage2 campsite={campsite} key={'stage2'} setValues={setValues} formValues={formValues} />,
		<Stage3 campsite={campsite} key={'stage3'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage1'} setValues={setValues} formValues={formValues} />,
		<Stage2 campsite={campsite} key={'stage2'} setValues={setValues} formValues={formValues} />,
		<Stage3 campsite={campsite} key={'stage3'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage1'} setValues={setValues} formValues={formValues} />,
		<Stage2 campsite={campsite} key={'stage2'} setValues={setValues} formValues={formValues} />,
		<Stage3 campsite={campsite} key={'stage3'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage1'} setValues={setValues} formValues={formValues} />,
		<Stage2 campsite={campsite} key={'stage2'} setValues={setValues} formValues={formValues} />,
		<Stage3 campsite={campsite} key={'stage3'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage1'} setValues={setValues} formValues={formValues} />,
		<Stage2 campsite={campsite} key={'stage2'} setValues={setValues} formValues={formValues} />,
		<Stage3 campsite={campsite} key={'stage3'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage1'} setValues={setValues} formValues={formValues} />,
		<Stage2 campsite={campsite} key={'stage2'} setValues={setValues} formValues={formValues} />,
		<Stage3 campsite={campsite} key={'stage3'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage1'} setValues={setValues} formValues={formValues} />,
		<Stage2 campsite={campsite} key={'stage2'} setValues={setValues} formValues={formValues} />,
		<Stage3 campsite={campsite} key={'stage3'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage1'} setValues={setValues} formValues={formValues} />,
		<Stage2 campsite={campsite} key={'stage2'} setValues={setValues} formValues={formValues} />,
		<Stage3 campsite={campsite} key={'stage3'} setValues={setValues} formValues={formValues} />,
		<Stage1 campsite={campsite} key={'stage1'} setValues={setValues} formValues={formValues} />,
		<Stage2 campsite={campsite} key={'stage2'} setValues={setValues} formValues={formValues} />,
		<Stage3 campsite={campsite} key={'stage3'} setValues={setValues} formValues={formValues} />
	];

	const goToNextStage = async () => {
		if (campsite) {
			const nextStage = campsite.draftStage + 1;
			const updatedCampsite = { ...campsite, draftStage: nextStage };

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
				campsite.draft = true;
				campsite.draftStage = 1;
				editCampsite(campsite);
			}
			setHasUpdated(true);
		}
	}, [id, campsite, hasUpdated]);
	return (
		<div>
			{stages[campsite?.draftStage ?? 9]}
			<button onClick={goToNextStage}>Next</button>
			{/* Your pager component would also need to be able to call updateCampsite and make an API request to update the database */}
		</div>
	);
}

export default withAuth(EditCampsite);
