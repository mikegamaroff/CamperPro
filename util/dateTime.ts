import { DateTime } from 'luxon';

export const dateSmall = (date: string | undefined): string => {
	const formattedDate = date ? DateTime.fromISO(date).toFormat("dd MMM, ''yy") : '';
	return formattedDate;
};
