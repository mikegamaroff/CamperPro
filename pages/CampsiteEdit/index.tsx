import Button from '../../components/Forms/Button';
import useDeleteCampsite from '../../routes/useDeleteCampsite';
import useEditCampsite from '../../routes/useEditCampsite';
import useGetCampsite from '../../routes/useGetCampsite';

interface Props {
	id: string;
}

function CampsiteEdit({ id }: Props) {
	const { campsite, isLoading: isFetching, isError: fetchError } = useGetCampsite(id);
	const { editCampsite, isLoading: isEditing, isError: editError, isSuccess } = useEditCampsite();
	const { deleteCampsite, isLoading, isError, isSuccess: isDeleteSuccess } = useDeleteCampsite();

	console.log(campsite);

	const updateCampsite = () => {
		if (campsite) {
			editCampsite(campsite);
		}
	};
	const handleDeleteCampsite = async () => {
		const response = await deleteCampsite(campsite?._id ?? '');
		if (response.success) {
			console.log(response);
			// Campsite deleted successfully
		} else {
			console.log(response);
			// Handle error
		}
	};
	return (
		<div>
			<div>{id}</div>
			<Button onClick={updateCampsite}>Edit</Button>
			<Button onClick={handleDeleteCampsite}>Delete</Button>
		</div>
	);
}

export default CampsiteEdit;
