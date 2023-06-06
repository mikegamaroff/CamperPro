import CampsiteEdit from '@pages/CampsiteEdit';
import { GetServerSideProps } from 'next';

interface Props {
	id: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
	const id = params?.id;
	if (!id) {
		return { notFound: true };
	}
	const idString = Array.isArray(id) ? id[0] : id;
	return { props: { id: idString } };
};
export default CampsiteEdit;
