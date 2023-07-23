import { ContentLoader } from '@components/ContentLoader';
import { IconClimbing } from '@components/Icons';
import { NoResults } from '@components/NoResults';
import { TripItem } from '@components/TripItem';
import { AuthContext } from '@context/authContext';
import { Trip } from '@model/trips';
import { useGetTripsByCamper } from '@routes/useGetTripsByCamper';
import { TripDateBadgeOutput, tripCalendarDateBadge } from '@utils/tripCalendarDateBadge';
import { useContext } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { Container } from '../components/Container';
import styles from './trips.module.css';
import withAuth from './withAuth';

function Trips() {
	const { user } = useContext(AuthContext);
	const { trips, isLoading } = useGetTripsByCamper(user?._id);
	const processedDates: TripDateBadgeOutput[] = tripCalendarDateBadge(trips as Trip[]);
	return (
		<Container shelfHeight={67}>
			<div className="contentWrapperFlush">
				<div className={styles.tripsShelf}>
					<h1 className="bold">Trips</h1>
					<div className="space10" />
					<div>Keep track of your upcoming trips</div>
				</div>
				<>
					<ContentLoader
						isLoading={isLoading}
						loadingMessage="Loading trips..."
						data={processedDates.length > 0 ? trips : null}
						noResults={
							<NoResults heading="No trips found." subheading="Create one now." icon={<IconClimbing />} />
						}
					>
						<div className="fader" />
						<Virtuoso
							totalCount={trips.length}
							data={trips}
							className={styles.tripCalendarScroller}
							itemContent={(index, trip) => (
								<>
									{trip && (
										<div key={trip._id} style={{ minHeight: '1px' }}>
											<TripItem
												index={index}
												trip={trip}
												lastItem={index === trips.length - 1}
												tripDateBadge={processedDates[index]}
											/>
										</div>
									)}
								</>
							)}
						/>
					</ContentLoader>
				</>
			</div>
		</Container>
	);
}

export default withAuth(Trips);
