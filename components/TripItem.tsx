import { Trip } from '@model/trips';
import { TripDateBadgeOutput } from '@utils/tripCalendarDateBadge';
import { TripDivider } from './TripDivider';
import { TripsCalendarItem } from './TripsCalendarItem';

export const TripItem: React.FC<{
	trip: Trip;
	lastItem: boolean;
	tripDateBadge: TripDateBadgeOutput;
	index: number;
}> = ({ trip, tripDateBadge, lastItem, index }) => {
	return (
		<div>
			{tripDateBadge &&
				tripDateBadge.previousMonths &&
				tripDateBadge.previousMonths.map((previousMonth, i) => {
					return (
						<div key={previousMonth + i}>
							<TripDivider label={previousMonth} topline={i === 0} empty />
						</div>
					);
				})}
			{tripDateBadge && tripDateBadge.newMonth && (
				<TripDivider
					label={tripDateBadge.newMonth}
					topline={tripDateBadge.previousMonths.length === 0 && index !== 0}
				/>
			)}
			<TripsCalendarItem key={trip._id} trip={trip} tripDateBadge={tripDateBadge} lastItem={lastItem} />
		</div>
	);
};
