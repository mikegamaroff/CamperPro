import { Container } from '../../components/Container';
import Button from '../../components/Forms/Button';
import { Campsite } from '../../model/campsite';
import useDeleteCampsite from '../../routes/useDeleteCampsite';
import useEditCampsite from '../../routes/useEditCampsite';
import { useGetCampsite } from '../../routes/useGetCampsite';
import { GoTo } from '../../util/GoTo';
interface Props {
	id: string;
}

function CampsiteEdit({ id }: Props) {
	const { campsite, isLoading: isFetching, isError: fetchError } = useGetCampsite(id);
	const { editCampsite, isLoading: isEditing, isError: editError, isSuccess: editSuccess } = useEditCampsite();

	const {
		deleteCampsite,
		isLoading: deleting,
		isError: deleteError,
		isSuccess: isDeleteSuccess
	} = useDeleteCampsite();

	if (isFetching || !campsite) {
		return <div>Loading..</div>;
	}
	const updateCampsite = () => {
		if (campsite) {
			const updatedCampsite: Campsite = { ...campsite, draft: false };
			editCampsite(updatedCampsite);
		}
	};

	const handleDeleteCampsite = async () => {
		const response = await deleteCampsite(campsite?._id ?? '');
		if (response.success) {
			console.log(response);
			GoTo('/');
		} else {
			console.log(response);
			// Handle error
		}
	};
	return (
		<Container>
			<>
				<div>{id}</div>
				<Button onClick={updateCampsite}>Edit</Button>
				<Button onClick={handleDeleteCampsite}>Delete</Button>
				{campsite.title}
			</>
		</Container>
	);
}

export default CampsiteEdit;
