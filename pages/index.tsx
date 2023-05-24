import { useContext, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { v4 as uuidv4 } from 'uuid';
import { Container } from '../components/Container';
import { FilterBar } from '../components/FIlterBar';
import { Fab } from '../components/Fab';
import { FeedCampsite } from '../components/FeedCampsite';
import { FeedSearchButton } from '../components/FeedSearchButton';
import { Header } from '../components/Header';
import { IconAdd } from '../components/Icons';
import { MenuButton } from '../components/MenuButton';
import { AuthContext } from '../context/authContext';
import { Attributes, EmptyNewCampsite, FilterIDType } from '../model/campsite';
import { useAddCampsite } from '../routes/useAddCampsite';
import { useGetAllCampsites } from '../routes/useGetAllCampsites';
import { GoTo } from '../util/GoTo';
import { selectFeedFilter } from '../util/selectFeedFilter';
import styles from './index.module.css';
import withAuth from './withAuth';

function Home() {
	const [selectedFilter, setSelectedFilter] = useState<Attributes>();
	const { campsites, isLoading } = useGetAllCampsites({ filters: selectedFilter });
	const { authUser } = useContext(AuthContext); // Access user and status from the AuthContext
	const { addCampsite, isLoading: addCampsiteLoading, isError, isSuccess } = useAddCampsite();

	const handleFilterSelect = (id: FilterIDType) => {
		const updatedFilters: Attributes | undefined = selectFeedFilter(selectedFilter, id);
		setSelectedFilter(updatedFilters);
	};
	console.log(selectedFilter);
	const handleAddCampsite = async () => {
		const newId = uuidv4(); // replace this with your ID generation logic
		const newCampsite = {
			...EmptyNewCampsite,
			_id: 'campsite:' + newId,
			title: 'Example Campsite',
			author: authUser?.id
			// Add other campsite properties
		};

		try {
			const response = await addCampsite(newCampsite);
			if (response.success) {
				GoTo(`/CampsiteEdit/${newCampsite._id}`);
			} else {
				console.error('Error adding campsite:', response.message);
			}
		} catch (error) {
			console.error('Error adding campsite:', error instanceof Error ? error.message : 'Unknown error');
		}
	};
	return (
		<>
			<Header title="logo" left={<MenuButton />} />

			<Container>
				<>
					<div className="layoutContainer">
						<div className={styles.feedSearchContainer}>
							<FeedSearchButton />
							<FilterBar selectedFilter={selectedFilter} handleFilterSelect={handleFilterSelect} />
						</div>
						<div className="contentWrapper">
							<div className={styles.feedContainer}>
								<Virtuoso
									totalCount={campsites.length}
									data={campsites}
									overscan={{ main: 2, reverse: 2 }}
									itemContent={(index, campsite) => <FeedCampsite campsite={campsite} />}
								/>
							</div>
						</div>
					</div>
					<Fab icon={<IconAdd />} onClick={handleAddCampsite} />
				</>
			</Container>
		</>
	);
}
export default withAuth(Home);
