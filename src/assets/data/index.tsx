import { Data } from '@shared/components/timeline/interfaces';

const rawData: Record<string, number> = [
  { timestamp: '2018-07-11', count: 8 },
  { timestamp: '2018-02-21', count: 50 },
  { timestamp: '2018-03-16', count: 67 },
  { timestamp: '2018-09-03', count: 81 },
  { timestamp: '2018-03-16', count: 12 },
  { timestamp: '2018-06-27', count: 17 },
  { timestamp: '2018-09-17', count: 72 },
  { timestamp: '2018-10-28', count: 46 },
  { timestamp: '2017-12-29', count: 8 },
  { timestamp: '2018-04-23', count: 19 },
  { timestamp: '2018-09-24', count: 91 },
  { timestamp: '2018-03-09', count: 56 },
  { timestamp: '2018-09-27', count: 44 },
  { timestamp: '2018-11-21', count: 45 },
  { timestamp: '2018-10-29', count: 9 },
  { timestamp: '2018-05-09', count: 68 },
  { timestamp: '2018-08-26', count: 56 },
  { timestamp: '2018-01-13', count: 5 },
  { timestamp: '2018-07-23', count: 79 },
  { timestamp: '2018-01-30', count: 57 },
  { timestamp: '2018-06-17', count: 95 },
  { timestamp: '2018-04-06', count: 5 },
  { timestamp: '2018-08-19', count: 32 },
  { timestamp: '2018-10-16', count: 39 },
  { timestamp: '2018-01-12', count: 25 },
  { timestamp: '2018-05-18', count: 16 },
  { timestamp: '2017-12-22', count: 43 },
  { timestamp: '2018-07-30', count: 7 },
  { timestamp: '2017-12-24', count: 82 },
  { timestamp: '2018-01-24', count: 50 },
  { timestamp: '2017-12-24', count: 61 },
  { timestamp: '2018-09-19', count: 73 },
  { timestamp: '2018-10-14', count: 5 },
  { timestamp: '2018-08-17', count: 91 },
  { timestamp: '2018-05-12', count: 60 },
  { timestamp: '2018-05-27', count: 5 },
  { timestamp: '2018-05-29', count: 67 },
  { timestamp: '2018-01-30', count: 42 },
  { timestamp: '2018-11-17', count: 35 },
  { timestamp: '2018-08-17', count: 71 },
  { timestamp: '2018-03-28', count: 46 },
  { timestamp: '2018-03-10', count: 96 },
  { timestamp: '2018-06-10', count: 22 },
  { timestamp: '2018-11-16', count: 40 },
  { timestamp: '2018-05-30', count: 76 },
  { timestamp: '2018-01-01', count: 12 },
  { timestamp: '2018-06-13', count: 61 },
  { timestamp: '2017-12-10', count: 95 },
  { timestamp: '2017-12-18', count: 3 },
  { timestamp: '2018-11-15', count: 86 },
  { timestamp: '2018-10-10', count: 20 },
  { timestamp: '2018-08-30', count: 94 },
  { timestamp: '2018-04-21', count: 93 },
  { timestamp: '2018-05-17', count: 2 },
  { timestamp: '2018-01-29', count: 45 },
  { timestamp: '2018-11-07', count: 39 },
  { timestamp: '2018-07-26', count: 99 },
  { timestamp: '2018-02-14', count: 11 },
  { timestamp: '2018-07-12', count: 65 },
  { timestamp: '2018-10-25', count: 32 },
  { timestamp: '2018-01-09', count: 42 },
  { timestamp: '2018-09-06', count: 8 },
  { timestamp: '2018-11-06', count: 13 },
  { timestamp: '2018-04-25', count: 75 },
  { timestamp: '2018-10-07', count: 65 },
  { timestamp: '2018-04-16', count: 92 },
  { timestamp: '2017-12-15', count: 63 },
  { timestamp: '2018-08-22', count: 66 },
  { timestamp: '2018-03-19', count: 20 },
  { timestamp: '2018-10-01', count: 59 },
  { timestamp: '2018-06-14', count: 22 },
  { timestamp: '2018-01-27', count: 80 },
  { timestamp: '2018-06-17', count: 80 },
  { timestamp: '2018-10-26', count: 74 },
  { timestamp: '2017-12-28', count: 9 },
  { timestamp: '2018-01-29', count: 29 },
  { timestamp: '2018-04-13', count: 53 },
  { timestamp: '2018-05-22', count: 9 },
  { timestamp: '2018-04-09', count: 25 },
  { timestamp: '2018-09-04', count: 3 },
  { timestamp: '2018-11-06', count: 49 },
  { timestamp: '2018-05-31', count: 55 },
  { timestamp: '2018-05-23', count: 84 },
  { timestamp: '2017-12-31', count: 59 },
  { timestamp: '2018-10-26', count: 38 },
  { timestamp: '2018-03-14', count: 57 },
  { timestamp: '2018-03-04', count: 63 },
  { timestamp: '2018-11-02', count: 81 },
  { timestamp: '2018-07-08', count: 60 },
  { timestamp: '2018-05-17', count: 49 },
  { timestamp: '2018-01-08', count: 66 },
  { timestamp: '2017-12-21', count: 41 },
  { timestamp: '2018-01-11', count: 23 },
  { timestamp: '2018-04-28', count: 30 },
  { timestamp: '2018-04-27', count: 50 },
  { timestamp: '2018-11-11', count: 9 },
  { timestamp: '2018-03-19', count: 50 },
  { timestamp: '2018-04-20', count: 25 },
  { timestamp: '2018-01-11', count: 27 },
  { timestamp: '2018-05-18', count: 82 },
  { timestamp: '2017-12-21', count: 72 },
  { timestamp: '2018-04-16', count: 64 },
  { timestamp: '2018-05-25', count: 62 },
  { timestamp: '2018-08-12', count: 75 },
  { timestamp: '2018-06-02', count: 71 },
  { timestamp: '2018-06-27', count: 92 },
  { timestamp: '2017-12-24', count: 21 },
  { timestamp: '2018-07-04', count: 76 },
  { timestamp: '2018-08-29', count: 46 },
  { timestamp: '2018-07-01', count: 36 },
  { timestamp: '2018-03-14', count: 61 },
  { timestamp: '2018-09-26', count: 30 },
  { timestamp: '2018-02-06', count: 40 },
  { timestamp: '2018-07-21', count: 60 },
  { timestamp: '2018-10-13', count: 84 },
  { timestamp: '2018-03-24', count: 32 },
  { timestamp: '2018-01-07', count: 40 },
  { timestamp: '2018-06-06', count: 89 },
  { timestamp: '2018-05-22', count: 64 },
  { timestamp: '2018-10-26', count: 90 },
  { timestamp: '2018-09-27', count: 30 },
  { timestamp: '2018-11-29', count: 57 },
  { timestamp: '2018-08-28', count: 75 },
  { timestamp: '2018-06-18', count: 95 },
  { timestamp: '2018-04-16', count: 18 },
  { timestamp: '2018-08-27', count: 37 },
  { timestamp: '2018-04-03', count: 53 },
  { timestamp: '2018-10-01', count: 100 },
  { timestamp: '2018-07-24', count: 4 },
  { timestamp: '2018-02-21', count: 22 },
  { timestamp: '2018-07-06', count: 31 },
  { timestamp: '2018-01-25', count: 12 },
  { timestamp: '2018-06-14', count: 34 },
  { timestamp: '2018-06-16', count: 51 },
  { timestamp: '2018-02-08', count: 11 },
  { timestamp: '2018-09-01', count: 67 },
  { timestamp: '2018-06-03', count: 21 },
  { timestamp: '2018-08-08', count: 71 },
  { timestamp: '2018-03-22', count: 44 },
  { timestamp: '2018-10-11', count: 53 },
  { timestamp: '2018-07-12', count: 89 },
  { timestamp: '2018-05-20', count: 93 },
  { timestamp: '2018-01-13', count: 44 },
  { timestamp: '2018-06-05', count: 46 },
  { timestamp: '2018-09-24', count: 21 },
  { timestamp: '2018-05-12', count: 36 },
  { timestamp: '2018-08-10', count: 35 },
  { timestamp: '2018-05-30', count: 37 },
  { timestamp: '2018-01-22', count: 77 },
  { timestamp: '2018-01-02', count: 73 },
  { timestamp: '2018-06-18', count: 51 },
  { timestamp: '2018-09-29', count: 17 },
  { timestamp: '2018-06-07', count: 20 },
  { timestamp: '2018-02-06', count: 62 },
  { timestamp: '2017-12-18', count: 92 },
  { timestamp: '2018-04-22', count: 22 },
  { timestamp: '2018-06-02', count: 22 },
  { timestamp: '2018-10-06', count: 19 },
  { timestamp: '2018-07-08', count: 27 },
  { timestamp: '2018-06-08', count: 23 },
  { timestamp: '2018-11-26', count: 54 },
  { timestamp: '2018-07-01', count: 72 },
  { timestamp: '2018-07-07', count: 11 },
  { timestamp: '2018-01-21', count: 24 },
  { timestamp: '2018-11-07', count: 60 },
  { timestamp: '2018-02-13', count: 59 },
  { timestamp: '2018-03-06', count: 70 },
  { timestamp: '2018-01-16', count: 70 },
  { timestamp: '2018-03-27', count: 60 },
  { timestamp: '2018-08-13', count: 24 },
  { timestamp: '2018-08-09', count: 49 },
  { timestamp: '2018-03-05', count: 77 },
  { timestamp: '2018-04-12', count: 1 },
  { timestamp: '2018-09-24', count: 35 },
  { timestamp: '2018-05-21', count: 48 },
  { timestamp: '2018-07-15', count: 26 },
  { timestamp: '2018-07-14', count: 72 },
  { timestamp: '2018-07-27', count: 95 },
  { timestamp: '2018-09-06', count: 29 },
  { timestamp: '2018-03-06', count: 36 },
  { timestamp: '2018-05-19', count: 55 },
  { timestamp: '2018-01-07', count: 90 },
  { timestamp: '2018-08-16', count: 20 },
  { timestamp: '2018-04-28', count: 18 },
  { timestamp: '2018-07-12', count: 24 },
  { timestamp: '2018-06-04', count: 12 },
  { timestamp: '2018-10-24', count: 9 },
  { timestamp: '2018-02-18', count: 84 },
  { timestamp: '2018-08-12', count: 21 },
  { timestamp: '2018-08-14', count: 78 },
  { timestamp: '2018-03-18', count: 2 },
  { timestamp: '2018-07-24', count: 12 },
  { timestamp: '2018-04-03', count: 43 },
  { timestamp: '2018-01-23', count: 12 },
  { timestamp: '2018-08-05', count: 3 },
  { timestamp: '2018-09-22', count: 18 },
  { timestamp: '2018-02-20', count: 59 },
  { timestamp: '2018-03-08', count: 26 },
  { timestamp: '2018-06-15', count: 11 },
  { timestamp: '2018-07-13', count: 35 },
  { timestamp: '2018-10-28', count: 42 },
  { timestamp: '2018-05-19', count: 32 },
  { timestamp: '2018-06-24', count: 23 },
  { timestamp: '2018-01-31', count: 59 },
  { timestamp: '2018-03-14', count: 56 },
  { timestamp: '2017-12-23', count: 66 },
  { timestamp: '2018-05-10', count: 11 },
  { timestamp: '2018-04-15', count: 49 },
  { timestamp: '2017-12-25', count: 85 },
  { timestamp: '2018-05-28', count: 22 },
  { timestamp: '2018-07-12', count: 22 },
  { timestamp: '2018-06-11', count: 81 },
  { timestamp: '2018-09-05', count: 64 },
  { timestamp: '2018-07-30', count: 5 },
  { timestamp: '2018-08-26', count: 91 },
  { timestamp: '2018-03-24', count: 79 },
  { timestamp: '2018-02-15', count: 34 },
  { timestamp: '2018-02-04', count: 42 },
  { timestamp: '2018-05-02', count: 35 },
  { timestamp: '2018-04-29', count: 97 },
  { timestamp: '2018-09-26', count: 83 },
  { timestamp: '2018-07-09', count: 58 },
  { timestamp: '2018-10-13', count: 21 },
  { timestamp: '2018-04-20', count: 86 },
  { timestamp: '2018-08-03', count: 53 },
  { timestamp: '2018-10-28', count: 61 },
  { timestamp: '2018-10-11', count: 95 },
  { timestamp: '2018-11-12', count: 3 },
  { timestamp: '2018-11-05', count: 54 },
  { timestamp: '2018-04-06', count: 24 },
  { timestamp: '2018-09-14', count: 8 },
  { timestamp: '2018-09-14', count: 14 },
  { timestamp: '2018-04-13', count: 7 },
  { timestamp: '2018-05-14', count: 28 },
  { timestamp: '2018-10-10', count: 4 },
  { timestamp: '2018-11-13', count: 25 },
  { timestamp: '2018-11-26', count: 30 },
  { timestamp: '2018-11-17', count: 10 },
  { timestamp: '2018-01-13', count: 31 },
  { timestamp: '2018-08-06', count: 26 },
  { timestamp: '2018-07-20', count: 7 },
  { timestamp: '2018-02-23', count: 64 },
  { timestamp: '2017-12-19', count: 18 },
  { timestamp: '2018-05-21', count: 95 },
  { timestamp: '2017-12-26', count: 63 },
  { timestamp: '2018-02-24', count: 55 },
  { timestamp: '2018-05-05', count: 58 },
  { timestamp: '2018-10-07', count: 72 },
  { timestamp: '2018-06-05', count: 38 },
  { timestamp: '2018-10-25', count: 50 },
  { timestamp: '2018-02-12', count: 54 },
  { timestamp: '2018-10-21', count: 73 },
  { timestamp: '2018-02-14', count: 16 },
  { timestamp: '2018-07-14', count: 21 },
  { timestamp: '2018-02-03', count: 77 },
  { timestamp: '2018-10-28', count: 87 },
  { timestamp: '2018-03-23', count: 69 },
  { timestamp: '2018-10-07', count: 64 },
  { timestamp: '2018-10-10', count: 8 },
  { timestamp: '2018-05-29', count: 58 },
  { timestamp: '2018-07-18', count: 89 },
  { timestamp: '2018-06-05', count: 7 },
  { timestamp: '2018-03-24', count: 43 },
  { timestamp: '2017-12-25', count: 75 },
  { timestamp: '2018-02-05', count: 39 },
  { timestamp: '2018-03-18', count: 8 },
  { timestamp: '2018-03-12', count: 79 },
  { timestamp: '2018-07-10', count: 43 },
  { timestamp: '2018-03-27', count: 47 },
  { timestamp: '2018-04-13', count: 30 },
  { timestamp: '2018-04-04', count: 19 },
  { timestamp: '2018-05-17', count: 13 },
  { timestamp: '2017-12-15', count: 43 },
  { timestamp: '2018-08-28', count: 32 },
  { timestamp: '2018-01-01', count: 18 },
  { timestamp: '2018-09-29', count: 45 },
  { timestamp: '2018-06-13', count: 70 },
  { timestamp: '2018-07-13', count: 66 },
  { timestamp: '2018-09-19', count: 62 },
  { timestamp: '2018-07-08', count: 10 },
  { timestamp: '2018-01-14', count: 6 },
  { timestamp: '2018-04-06', count: 7 },
  { timestamp: '2018-09-21', count: 35 },
  { timestamp: '2018-10-10', count: 54 },
  { timestamp: '2017-12-05', count: 35 },
  { timestamp: '2018-01-06', count: 70 },
  { timestamp: '2018-10-16', count: 83 },
  { timestamp: '2017-12-20', count: 66 },
  { timestamp: '2018-06-28', count: 37 },
  { timestamp: '2018-10-12', count: 6 },
  { timestamp: '2018-07-07', count: 75 },
  { timestamp: '2018-10-05', count: 30 },
  { timestamp: '2018-09-25', count: 83 },
  { timestamp: '2018-07-02', count: 70 },
  { timestamp: '2018-11-22', count: 88 },
  { timestamp: '2018-03-03', count: 28 },
  { timestamp: '2018-04-02', count: 86 },
  { timestamp: '2018-11-19', count: 78 },
  { timestamp: '2018-11-06', count: 41 },
  { timestamp: '2018-02-08', count: 100 },
  { timestamp: '2018-07-24', count: 94 },
  { timestamp: '2018-05-03', count: 98 },
  { timestamp: '2018-03-16', count: 77 },
  { timestamp: '2018-08-13', count: 54 },
  { timestamp: '2018-04-27', count: 46 },
  { timestamp: '2018-10-23', count: 42 },
  { timestamp: '2018-04-18', count: 29 },
  { timestamp: '2018-03-25', count: 73 },
  { timestamp: '2018-08-20', count: 64 },
  { timestamp: '2018-07-15', count: 54 },
  { timestamp: '2018-08-23', count: 90 },
  { timestamp: '2018-08-31', count: 53 },
  { timestamp: '2018-06-22', count: 67 },
  { timestamp: '2018-02-19', count: 40 },
  { timestamp: '2018-07-25', count: 84 },
  { timestamp: '2018-06-26', count: 42 },
  { timestamp: '2018-08-17', count: 95 },
  { timestamp: '2018-08-24', count: 82 },
  { timestamp: '2018-03-24', count: 79 },
  { timestamp: '2018-08-17', count: 44 },
  { timestamp: '2017-12-10', count: 54 },
  { timestamp: '2018-04-13', count: 59 },
  { timestamp: '2017-12-30', count: 34 },
  { timestamp: '2018-07-08', count: 67 },
  { timestamp: '2018-06-22', count: 3 },
  { timestamp: '2018-01-20', count: 69 },
  { timestamp: '2018-05-26', count: 57 },
  { timestamp: '2018-03-27', count: 54 },
  { timestamp: '2018-10-06', count: 88 },
  { timestamp: '2018-05-09', count: 47 },
  { timestamp: '2018-11-15', count: 27 },
  { timestamp: '2018-03-01', count: 75 },
  { timestamp: '2018-11-08', count: 52 },
  { timestamp: '2018-05-20', count: 84 },
  { timestamp: '2018-06-18', count: 56 },
  { timestamp: '2018-02-13', count: 20 },
  { timestamp: '2018-07-10', count: 74 },
  { timestamp: '2018-09-14', count: 18 },
  { timestamp: '2018-08-28', count: 40 },
  { timestamp: '2018-08-10', count: 80 },
  { timestamp: '2018-10-30', count: 91 },
  { timestamp: '2018-08-26', count: 79 },
  { timestamp: '2018-10-29', count: 40 },
  { timestamp: '2018-01-31', count: 33 },
  { timestamp: '2018-10-03', count: 58 },
  { timestamp: '2018-11-14', count: 42 },
  { timestamp: '2018-10-30', count: 94 },
  { timestamp: '2018-01-24', count: 26 },
  { timestamp: '2018-11-20', count: 9 },
  { timestamp: '2018-05-22', count: 83 },
  { timestamp: '2018-10-26', count: 21 },
  { timestamp: '2018-04-04', count: 31 },
  { timestamp: '2018-04-15', count: 26 },
  { timestamp: '2018-07-25', count: 26 },
  { timestamp: '2018-09-09', count: 26 },
  { timestamp: '2018-02-04', count: 3 },
  { timestamp: '2018-10-29', count: 26 },
  { timestamp: '2018-07-30', count: 90 },
  { timestamp: '2018-11-04', count: 89 },
  { timestamp: '2018-03-31', count: 61 },
  { timestamp: '2017-12-14', count: 2 },
  { timestamp: '2018-08-17', count: 81 },
  { timestamp: '2018-07-14', count: 72 },
  { timestamp: '2018-10-08', count: 74 },
  { timestamp: '2018-08-02', count: 71 },
  { timestamp: '2018-06-06', count: 74 },
  { timestamp: '2018-09-28', count: 25 },
  { timestamp: '2018-05-02', count: 52 },
  { timestamp: '2018-02-27', count: 33 },
  { timestamp: '2018-03-20', count: 14 },
  { timestamp: '2018-02-15', count: 31 },
  { timestamp: '2018-02-21', count: 54 },
  { timestamp: '2018-09-11', count: 52 },
  { timestamp: '2018-10-09', count: 45 },
  { timestamp: '2017-12-31', count: 56 },
  { timestamp: '2018-01-08', count: 65 },
  { timestamp: '2018-06-12', count: 49 },
  { timestamp: '2018-09-16', count: 8 },
  { timestamp: '2018-07-05', count: 34 },
  { timestamp: '2018-03-26', count: 97 },
  { timestamp: '2018-07-02', count: 42 },
  { timestamp: '2018-07-12', count: 99 },
  { timestamp: '2018-04-07', count: 86 },
  { timestamp: '2018-08-14', count: 72 },
  { timestamp: '2018-02-26', count: 58 },
  { timestamp: '2018-06-19', count: 93 },
  { timestamp: '2018-06-02', count: 48 },
  { timestamp: '2018-09-25', count: 25 },
  { timestamp: '2018-11-01', count: 53 },
  { timestamp: '2018-01-13', count: 88 },
  { timestamp: '2018-01-29', count: 61 },
  { timestamp: '2018-04-23', count: 28 },
  { timestamp: '2018-11-04', count: 10 },
  { timestamp: '2018-08-29', count: 61 },
  { timestamp: '2018-11-26', count: 18 },
  { timestamp: '2018-04-22', count: 82 },
  { timestamp: '2018-03-13', count: 78 },
  { timestamp: '2018-11-16', count: 38 },
  { timestamp: '2018-01-15', count: 3 },
  { timestamp: '2018-10-08', count: 71 },
  { timestamp: '2018-08-23', count: 7 },
  { timestamp: '2018-09-10', count: 24 },
  { timestamp: '2018-06-14', count: 50 },
  { timestamp: '2018-04-09', count: 68 },
  { timestamp: '2018-02-25', count: 99 },
  { timestamp: '2018-01-29', count: 85 },
  { timestamp: '2018-07-21', count: 85 },
  { timestamp: '2018-09-19', count: 82 },
  { timestamp: '2018-08-26', count: 89 },
  { timestamp: '2018-06-24', count: 45 },
  { timestamp: '2018-04-26', count: 89 },
  { timestamp: '2018-02-08', count: 93 },
  { timestamp: '2018-07-18', count: 84 },
  { timestamp: '2018-08-12', count: 71 },
  { timestamp: '2018-11-18', count: 51 },
  { timestamp: '2018-03-31', count: 18 },
  { timestamp: '2018-02-12', count: 73 },
  { timestamp: '2018-10-20', count: 85 },
  { timestamp: '2018-10-28', count: 68 },
  { timestamp: '2018-06-21', count: 11 },
  { timestamp: '2018-04-11', count: 83 },
  { timestamp: '2018-05-03', count: 78 },
  { timestamp: '2018-09-10', count: 97 },
  { timestamp: '2018-07-12', count: 30 },
  { timestamp: '2018-04-19', count: 48 },
  { timestamp: '2018-01-16', count: 37 },
  { timestamp: '2018-01-29', count: 86 },
  { timestamp: '2018-03-05', count: 2 },
  { timestamp: '2018-07-28', count: 7 },
  { timestamp: '2018-09-22', count: 44 },
  { timestamp: '2018-06-14', count: 15 },
  { timestamp: '2018-03-03', count: 45 },
  { timestamp: '2018-10-08', count: 70 },
  { timestamp: '2018-01-19', count: 20 },
  { timestamp: '2018-11-08', count: 98 },
  { timestamp: '2018-12-03', count: 77 },
  { timestamp: '2018-02-03', count: 82 },
  { timestamp: '2017-12-31', count: 99 },
  { timestamp: '2018-07-02', count: 83 },
  { timestamp: '2018-05-01', count: 80 },
  { timestamp: '2018-10-24', count: 29 },
  { timestamp: '2018-07-08', count: 49 },
  { timestamp: '2018-05-27', count: 60 },
  { timestamp: '2018-08-24', count: 40 },
  { timestamp: '2017-12-17', count: 77 },
  { timestamp: '2018-09-10', count: 91 },
  { timestamp: '2018-03-24', count: 61 },
  { timestamp: '2018-03-20', count: 15 },
  { timestamp: '2018-05-22', count: 70 },
  { timestamp: '2018-09-13', count: 20 },
  { timestamp: '2018-01-20', count: 71 },
  { timestamp: '2018-04-15', count: 83 },
  { timestamp: '2018-07-30', count: 36 },
  { timestamp: '2017-12-06', count: 13 },
  { timestamp: '2018-06-29', count: 81 },
  { timestamp: '2018-11-08', count: 48 },
  { timestamp: '2018-09-16', count: 37 },
  { timestamp: '2018-03-02', count: 58 },
  { timestamp: '2017-12-23', count: 94 },
  { timestamp: '2018-09-14', count: 52 },
  { timestamp: '2018-04-18', count: 61 },
  { timestamp: '2018-08-21', count: 4 },
  { timestamp: '2018-10-31', count: 15 },
  { timestamp: '2018-06-07', count: 29 },
  { timestamp: '2018-01-15', count: 89 },
  { timestamp: '2018-05-11', count: 34 },
  { timestamp: '2018-07-14', count: 95 },
  { timestamp: '2018-09-29', count: 47 },
  { timestamp: '2018-06-18', count: 25 },
  { timestamp: '2018-02-14', count: 86 },
  { timestamp: '2018-11-13', count: 65 },
  { timestamp: '2018-01-03', count: 84 },
  { timestamp: '2018-10-30', count: 13 },
  { timestamp: '2018-12-01', count: 99 },
  { timestamp: '2018-10-13', count: 41 },
  { timestamp: '2018-09-10', count: 59 },
  { timestamp: '2018-01-22', count: 86 },
  { timestamp: '2018-07-18', count: 99 },
  { timestamp: '2018-04-07', count: 9 },
  { timestamp: '2018-10-17', count: 4 },
  { timestamp: '2018-08-15', count: 91 },
  { timestamp: '2018-07-31', count: 84 },
  { timestamp: '2017-12-11', count: 78 },
  { timestamp: '2018-09-18', count: 54 },
  { timestamp: '2018-07-10', count: 69 },
  { timestamp: '2018-08-18', count: 89 },
  { timestamp: '2018-08-30', count: 69 },
  { timestamp: '2018-04-27', count: 22 },
  { timestamp: '2018-11-30', count: 45 },
  { timestamp: '2018-03-10', count: 74 },
  { timestamp: '2018-11-22', count: 10 },
  { timestamp: '2018-08-09', count: 51 },
  { timestamp: '2018-02-02', count: 61 },
  { timestamp: '2018-01-04', count: 29 },
  { timestamp: '2018-06-27', count: 71 },
  { timestamp: '2017-12-18', count: 42 },
  { timestamp: '2018-04-03', count: 26 },
  { timestamp: '2018-11-16', count: 14 },
  { timestamp: '2017-01-01', count: 23 },
  { timestamp: '2018-01-01', count: 23 },
  { timestamp: '2019-01-01', count: 23 }
].reduce(
  (acc, { timestamp, count }) => {
    if ( !acc[timestamp] )
      return { ...acc, [timestamp]: count };
    return { ...acc, [timestamp]: acc[timestamp] + count };
  }, 
  {}
);

const _dataset: [ string, number ][] = Object
  .entries(rawData);

export const dataset: Data[] = _dataset
  .reduce(
    (acc: any[], [ timestamp, count ]) => {
      const data: Data = { timestamp, count };
      return [ ...acc, data];
    }, 
    [])
  .sort((a, b) => (+new Date(a.timestamp)) - (+new Date(b.timestamp)) );