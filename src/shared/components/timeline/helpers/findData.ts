import { Data } from '../interfaces';

export const findData = (dataset: Data[], date: Date) => ({ timestamp }: Data) => (+new Date(timestamp)) >= (+date);