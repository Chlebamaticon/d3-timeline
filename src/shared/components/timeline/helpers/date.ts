import { timeFormat } from 'd3-time-format';

export const parseDate = (dateString: string) => new Date(dateString);

export const toISO = timeFormat('%Y-%m-%d');