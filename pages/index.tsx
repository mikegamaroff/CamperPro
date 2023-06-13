import { Container } from '@components/Container';
import { FilterBar } from '@components/FIlterBar';
import { FeedCampsite } from '@components/FeedCampsite';
import { FeedSearchButton } from '@components/FeedSearchButton';
import { Header } from '@components/Header';
import { MenuButton } from '@components/MenuButton';
import { AuthContext } from '@context/authContext';
import { Attributes, CampsiteFilter, FilterIDType } from '@model/campsite';
import { useGetAllCampsites } from '@routes/useGetAllCampsites';
import { selectFeedFilter } from '@utils/selectFeedFilter';
import { useContext, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

import styles from './index.module.css';
import withAuth from './withAuth';

function Home() {
	const [selectedFilter, setSelectedFilter] = useState<CampsiteFilter>({});
	const { campsites, isLoading } = useGetAllCampsites({ filters: selectedFilter });
	const { user } = useContext(AuthContext);

	const handleFilterSelect = (id: FilterIDType) => {
		const updatedAttributes: Attributes | undefined = selectFeedFilter(selectedFilter.attributes, id);
		setSelectedFilter({ ...selectedFilter, attributes: updatedAttributes });
	};
	return (
		<>
			<Header title="logo" left={<MenuButton />} />

			<Container>
				<>
					<div className="layoutContainer">
						<div className={styles.feedSearchContainer}>
							<FeedSearchButton setSelectedFilter={setSelectedFilter} selectedFilter={selectedFilter} />
							<FilterBar
								selectedAttributes={selectedFilter.attributes}
								handleFilterSelect={handleFilterSelect}
							/>
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
				</>
			</Container>
		</>
	);
}
export default withAuth(Home);
