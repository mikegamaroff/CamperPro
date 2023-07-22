import { Trip } from '@model/trips';

export type TripDateBadgeOutput =
	| {
			dayOfWeek: string;
			day: number;
			month: string;
			newMonth: string | null;
			previousMonths: string[];
	  }
	| false;

export const tripCalendarDateBadge = (campsites: Trip[]): TripDateBadgeOutput[] => {
	const processedTrips: TripDateBadgeOutput[] = [];
	const seenDays = new Set<string>();
	const seenMonths = new Set<string>();
	let previousTripDate: Date | undefined;

	if (campsites) {
		for (const campsite of campsites) {
			const monthsWithoutTrips: string[] = [];
			const tripDate = new Date(campsite.created_at as string);
			const day = tripDate.getDate();
			const month = tripDate.toLocaleString('en-US', { month: 'long' });
			const year = tripDate.getFullYear();
			const dayOfWeek = tripDate.toLocaleString('en-US', { weekday: 'long' }).slice(0, 3);
			const uniqueDayIdentifier = `${year}-${month}-${day}`;
			const uniqueMonthIdentifier = `${year}-${month}`;

			// This is the DateBadge object
			const newDateBadge: TripDateBadgeOutput = {
				dayOfWeek,
				day,
				month: month.slice(0, 3),
				newMonth: null,
				previousMonths: []
			};

			// This checks to see if previous months have events to display blank month
			if (previousTripDate) {
				const yearDiff = tripDate.getFullYear() - previousTripDate.getFullYear();
				const monthDiff = tripDate.getMonth() - previousTripDate.getMonth();
				const totalMonthDiff = yearDiff * 12 + monthDiff;

				if (totalMonthDiff > 1) {
					for (let i = 1; i < totalMonthDiff; i++) {
						const missingMonthDate = new Date(previousTripDate);
						missingMonthDate.setMonth(previousTripDate.getMonth() + i);
						const missingMonthName = missingMonthDate.toLocaleString('en-US', { month: 'long' });
						monthsWithoutTrips.push(missingMonthName);
					}
				}
			}
			previousTripDate = tripDate;

			// This detects when we come up to a new month so we can add divider
			if (!seenMonths.has(uniqueMonthIdentifier)) {
				seenMonths.add(uniqueMonthIdentifier);
				newDateBadge.newMonth = month;
				newDateBadge.previousMonths = monthsWithoutTrips;
			}

			// This detects when we get to a new day so we can add the dateBadge
			if (!seenDays.has(uniqueDayIdentifier)) {
				seenDays.add(uniqueDayIdentifier);
				processedTrips.push(newDateBadge);
			} else {
				processedTrips.push(false);
			}
		}
	}

	return processedTrips;
};
