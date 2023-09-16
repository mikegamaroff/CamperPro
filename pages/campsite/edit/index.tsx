import { Container } from '@components/Container';
import { Footer } from '@components/Footer';
import { IconButton } from '@components/Forms/IconButton';
import { Header } from '@components/Header';
import { IconBackArrow, IconClose, IconForwardArrow } from '@components/Icons';
import { Pager } from '@components/Pager';
import { STAGE_COUNT, StageWrapper } from '@components/campsites/editStages/Stages';
import { useFormValues } from '@hooks/useFormValues';
import { Campsite } from '@model/campsite';
import { objectEquals } from '@model/model';
import withAuth from '@pages/withAuth';
import useDeleteCampsite from '@routes/useDeleteCampsite';
import { useEditCampsite } from '@routes/useEditCampsite';
import { useGetCampsite } from '@routes/useGetCampsite';
import { UserEditRules } from 'formConfigs/editUserFieldsConfig';
import { useCallback, useEffect, useState } from 'react';

interface Props {
	id: string;
}

function EditCampsite({ id }: Props) {
	const { editCampsite, isLoading: editing, isError: editError, isSuccess: editSuccess } = useEditCampsite();
	const { deleteCampsite, isLoading: deleting } = useDeleteCampsite();
	const { campsite, isLoading, isError } = useGetCampsite(id);
	const {
		setValues,
		formValues,
		stateDataObject: newCampsite
	} = useFormValues<Campsite>(UserEditRules, campsite, objectEquals);
	const [hasUpdated, setHasUpdated] = useState(false);
	const totalPages = STAGE_COUNT;

	const updateCampsite = useCallback(
		async (updatedCampsite: Campsite) => {
			const updated = await editCampsite(updatedCampsite);
			if (updated.success) {
				// Additional logic if needed
			}
		},
		[editCampsite]
	);

	const goToNextStage = useCallback(
		async (page?: number) => {
			if (campsite) {
				const updatedCampsite = { ...campsite, draftStage: page ?? campsite?.draftStage };
				updateCampsite(updatedCampsite);
			}
		},
		[campsite, updateCampsite]
	);

	useEffect(() => {
		if (campsite && id && !hasUpdated) {
			if (!campsite.draft) {
				updateCampsite({ ...campsite, draftStage: 0 });
			}
			setHasUpdated(true);
		}
	}, [campsite, id, hasUpdated, updateCampsite]);

	if (!campsite || !setValues || !formValues) {
		return null;
	}

	const handleDeleteCampsite = async (campsite: Campsite) => {
		const response = await deleteCampsite(campsite?._id ?? '');
		if (response.success) {
			console.log(response);
			// GoTo('/');
		} else {
			console.log(response);
			// Handle error
		}
	};

	return (
		<>
			<Header title="Edit Campsite" left={<IconButton icon={<IconClose />} onClick={() => history.go(-1)} />} />
			{campsite && (
				<>
					<Pager
						page={campsite ? campsite.draftStage : 0}
						draftMode={campsite.draft}
						totalPages={totalPages}
						onClick={goToNextStage}
					/>
					<Container hidetabs scroll footer shelfHeight={125}>
						<div className="contentWrapper">
							<StageWrapper
								stage={campsite.draftStage}
								campsite={campsite}
								setValues={setValues}
								formValues={formValues}
							/>
						</div>
					</Container>
					<Footer
						left={
							<IconButton
								icon={<IconBackArrow />}
								onClick={() => {
									if (Number.isInteger(campsite.draftStage)) {
										campsite.draftStage === 0
											? history.go(-1)
											: goToNextStage(campsite.draftStage - 1);
									}
								}}
							/>
						}
						right={
							<IconButton
								icon={<IconForwardArrow />}
								onClick={() => {
									if (Number.isInteger(campsite.draftStage)) {
										campsite.draftStage === totalPages
											? console.log('Save Campsite')
											: goToNextStage(campsite.draftStage + 1);
									}
								}}
							/>
						}
					/>
				</>
			)}
		</>
	);
}

export default withAuth(EditCampsite);
