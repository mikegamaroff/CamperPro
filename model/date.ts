import { DateTime } from 'luxon';

// This accepts a local date time as if it were entered in the home timezone of the instance
// And generates the correct UTC date time for the database
export const convertFromLocalTimezone = (date: string, timezone: string, baseTimezone: string): string => {
	const parsed = parseDate(date);
	const tzDate = parsed.setZone(timezone);
	const newDate = DateTime.now().setZone(baseTimezone).set({
		year: tzDate.year,
		month: tzDate.month,
		day: tzDate.day,
		hour: tzDate.hour,
		minute: tzDate.minute,
		second: tzDate.second,
		millisecond: tzDate.millisecond
	});
	const isoDate = newDate.toUTC().toISO();

	return isoDate || '';
};

// This takes a DB time and converts it a local time for display, such that the time *appears* to be
// the same time of day as it is in the home timezone of the instance
export const convertToLocalTimezone = (date: string, timezone: string, baseTimezone: string): string => {
	const parsed = parseDate(date);
	const tzDate = parsed.setZone(baseTimezone);
	const newDate = DateTime.now().setZone(timezone).set({
		year: tzDate.year,
		month: tzDate.month,
		day: tzDate.day,
		hour: tzDate.hour,
		minute: tzDate.minute,
		second: tzDate.second,
		millisecond: tzDate.millisecond
	});
	const isoDate = newDate.toUTC().toISO();

	return isoDate || '';
};

// This should only be used in the browser. On the server side, stick to ISO dates
export const formatLocalDateTime = (date: string | undefined | null): string => {
	if (!date) return '';
	return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED);
};

export const formatLocalDateTimeShort = (date: string | undefined | null): string => {
	if (!date) return '';
	const dt = parseDate(date);
	const month = dt.toFormat('MMM');
	const day = dt.toFormat('d');
	const hour = dt.toFormat('h');
	const minute = dt.toFormat('mm');
	const period = dt.toFormat('a');
	return `${month} ${day} at ${hour}:${minute}${period.toLowerCase()}`;
};

export const formatLocalDateTimeHourAndMinutes = (date: string | undefined | null): string => {
	if (!date) return '';
	const dt = parseDate(date);
	const hour = dt.toFormat('h');
	const minute = dt.toFormat('mm');
	const period = dt.toFormat('a');
	return `${hour}:${minute}${period.toLowerCase()}`;
};

// This should only be used in the browser. On the server side, stick to ISO dates
export const formatLocalDate = (date: string | undefined | null): string => {
	if (!date) return '';
	return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);
};

/**
 * Convert a luxon date to ISO format
 * @param {DateTime} date A luxon date
 * @returns {string} The date in ISO format
 */
export const toString: (date: DateTime | null) => string = date => {
	const isoDate = date?.toUTC().toISO();

	return isoDate || '';
};

/**
 * Get the current date/time
 * @returns {string} The current date time in ISO format UTC
 */
export const getNow: () => string | null = () => {
	const isoDate = DateTime.now().toUTC().toISO();
	return isoDate || '';
};

/**
 * Parse a date from ISO format
 * @param {string} date Date in ISO format
 * @returns {DateTime} A luxon date time
 */
export const parseDate: (date: string) => DateTime = date => {
	return DateTime.fromISO(date);
};

/**
 * Get the date portion of a date/time string in yyyy-MM-dd format
 * @param { string } date - the date to get the date portion for
 * @returns { string } the date portion of the date/time
 */
export function getDatePortion(date: string) {
	return parseDate(date).toFormat('yyyy-MM-dd');
}

/**
 * Add a number of days to a date.
 * @param {string} date in ISO format
 * @param {number} days Number of days to add, pass negative to subtract
 * @returns {string} A new date in ISO format
 */
export const addDays: (date: string, days: number) => string = (date: string, days: number): string => {
	return toString(DateTime.fromISO(date).plus({ days }));
};

/**
 * Add a number of houts to a date.
 * @param {string} date in ISO format
 * @param {number} hours Number of hours to add, pass negative to subtract
 * @returns {string} A new date in ISO format
 */
export const addHours: (date: string, hours: number) => string = (date: string, hours: number): string => {
	return toString(DateTime.fromISO(date).plus({ hours }));
};

/**
 * Add a number of minutes to a date.
 * @param {string} date in ISO format
 * @param {number} minutes Number of minutes to add, pass negative to subtract
 * @returns {string} A new date in ISO format
 */
export const addMinutes: (date: string, minutes: number) => string = (date: string, minutes: number): string => {
	return toString(DateTime.fromISO(date).plus({ minutes }));
};

/**
 * Add a number of seconds to a date.
 * @param {string} date in ISO format
 * @param {number} seconds Number of seconds to add, pass negative to subtract
 * @returns {string} A new date in ISO format
 */
export const addSeconds: (date: string, seconds: number) => string = (date: string, seconds: number): string => {
	return toString(DateTime.fromISO(date).plus({ seconds }));
};

/**
 * Add a number of years to a date.
 * @param {string} date in ISO format
 * @param {number} years Number of years to add, pass negative to subtract
 * @returns {string} A new date in ISO format
 */
export const addYears: (date: string, years: number) => string = (date: string, years: number): string => {
	return toString(DateTime.fromISO(date).plus({ years }));
};

/**
 * Add a number of years to a date.
 * @param {string} date in ISO format
 * @param {number} months Number of mounts to add, pass negative to subtract
 * @returns {string} A new date in ISO format
 */
export const addMonths: (date: string, years: number) => string = (date: string, months: number): string => {
	return toString(DateTime.fromISO(date).plus({ months }));
};

/**
 * Get the current day, sans time, based on the local installation time zone (default America/New_York)
 * DO NOT use this for document update/create dates, only for display purposes, or special cases where things
 * are tracked based on the local day, like user logins.
 * @returns {string} The current day in YYYY-MM-DD format
 */
export const getLocalDay = (): string => {
	const today = DateTime.now();
	today.setZone(process.env.TIMEZONE || 'America/New_York');
	return today.toFormat('yyyy-MM-dd');
};
export const dateSmall = (date: string | undefined): string => {
	const formattedDate = date ? DateTime.fromISO(date).toFormat("dd MMM, ''yy") : '';
	return formattedDate;
};

/**
 * Get endDate - startDate in days
 * @param {string} startDate The start date in ISO format
 * @param {string} endDate The end date in ISO format
 * @returns {number} The number of days between the two dates, endDate - startDate, unrounded
 */
export const dateDiffDays: (startDate: string, endDate: string) => number = (startDate, endDate) => {
	const res = DateTime.fromISO(endDate).diff(DateTime.fromISO(startDate), ['days']);
	return res.days;
};

/**
 * Get endDate - startDate in hours
 * @param {string} startDate The start date in ISO format
 * @param {string} endDate The end date in ISO format
 * @returns {number} The number of hours between the two dates, endDate - startDate, unrounded
 */
export const dateDiffHours: (startDate: string, endDate: string) => number = (startDate, endDate) => {
	const res = DateTime.fromISO(endDate).diff(DateTime.fromISO(startDate), ['hours']);
	return res.hours;
};

/**
 * Get endDate - startDate in minutes
 * @param {string} startDate The start date in ISO format
 * @param {string} endDate The end date in ISO format
 * @returns {number} The number of minutes between the two dates, endDate - startDate, unrounded
 */
export const dateDiffMinutes: (startDate: string, endDate: string) => number = (startDate, endDate) => {
	const res = DateTime.fromISO(endDate).diff(DateTime.fromISO(startDate), ['minutes']);
	return res.minutes;
};

export const dateDiffMilliseconds: (startDate: string, endDate: string) => number = (startDate, endDate) => {
	const res = DateTime.fromISO(endDate).diff(DateTime.fromISO(startDate), ['milliseconds']);
	return res.milliseconds;
};

export const calcDateSpanDescription = (date: string, from?: DateTime | string) => {
	const pluralize = (num: number, str: string) => (num > 1 ? str + 's' : str);

	if (date === '') return '';
	if (typeof from === 'undefined') from = DateTime.now();
	if (typeof from === 'string') {
		from = parseDate(from);
	}
	const then = DateTime.fromISO(date);
	let span = from.diff(then, ['days', 'months', 'years']);
	let m = 0;
	let description = 'ago';
	if (span.days < 0 || span.months < 0 || span.years < 0) {
		span = then.diff(from, ['days', 'months', 'years']);
		description = 'from now';
	}

	if (span.years >= 1) {
		return (m = Math.round(span.years)) + ` ${pluralize(m, 'year')} ${description}`;
	} else if (span.months >= 1) {
		return (m = Math.round(span.months)) + ` ${pluralize(m, 'month')} ${description}`;
	} else if (span.days < 1) {
		if (span.days < 1 / 24) {
			if (span.days < 1 / 24 / 60) {
				return 'just now';
			}
			return (m = Math.round(span.days * 24 * 60)) + ` ${pluralize(m, 'min')} ${description}`;
		}
		return (m = Math.round(span.days * 24)) + ` ${pluralize(m, 'hour')} ${description}`;
	} else if (span.days < 14) {
		return (m = Math.round(span.days)) + ` ${pluralize(m, 'day')} ${description}`;
	} else {
		return (m = Math.round(span.days / 7)) + ` ${pluralize(m, 'week')} ${description}`;
	}
};
