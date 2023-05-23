import { GetServerSideProps } from 'next';
import { CampsiteImages } from '../../components/CampsiteImages';
import { Container } from '../../components/Container';
import { IconButton } from '../../components/Forms/IconButton';
import { Header } from '../../components/Header';
import { IconBackArrow } from '../../components/Icons';
import { useGetCampsite } from '../../routes/useGetCampsite';
import withAuth from '../withAuth';

interface PostPageProps {
	id: string;
}

const Campsite: React.FC<PostPageProps> = ({ id }) => {
	const { campsite, isLoading } = useGetCampsite(id);

	return (
		<>
			<Header title="logo" left={<IconButton icon={<IconBackArrow />} onClick={() => history.go(-1)} />} />

			<Container scroll>
				<>
					<CampsiteImages campsite={campsite} />
					<h1>{campsite?.title}</h1>
				</>
			</Container>
		</>
	);
};

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
export default withAuth(Campsite);
