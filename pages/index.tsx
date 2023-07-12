import { Container } from '@components/Container';
import { ContentLoader } from '@components/ContentLoader';
import { FilterBar } from '@components/FIlterBar';
import { FeedCampsite } from '@components/FeedCampsite';
import { FeedSearchButton } from '@components/FeedSearchButton';
import { Header } from '@components/Header';
import { IconTrips } from '@components/Icons';
import { MenuButton } from '@components/MenuButton';
import { NoResults } from '@components/NoResults';
import { FilterContext } from '@context/filterContext';
import { useGetAllCampsites } from '@routes/useGetAllCampsites';
import { useContext } from 'react';
import { Virtuoso } from 'react-virtuoso';
import styles from './index.module.css';
import withAuth from './withAuth';

function Home() {
	const { selectedFilter } = useContext(FilterContext);
	const { campsites, isLoading } = useGetAllCampsites({ filters: selectedFilter });

	return (
		<>
			<Header title="logo" left={<MenuButton />} />

			<Container>
				<>
					<div className="layoutContainer">
						<div className={styles.feedSearchContainer}>
							<FeedSearchButton />
							<FilterBar />
						</div>
						<div className="contentWrapper">
							<div className={styles.feedContainer}>
								<ContentLoader
									isLoading={isLoading}
									loadingMessage="Loading campsites..."
									data={campsites}
									noResults={
										<NoResults
											heading="No campsites found."
											subheading="Please expand your search."
											icon={<IconTrips />}
										/>
									}
								>
									<Virtuoso
										totalCount={campsites.length}
										data={campsites}
										overscan={{ main: 2, reverse: 2 }}
										itemContent={(index, campsite) => <FeedCampsite campsite={campsite} />}
									/>
								</ContentLoader>
							</div>
						</div>
					</div>
				</>
			</Container>
		</>
	);
}
export default withAuth(Home);
