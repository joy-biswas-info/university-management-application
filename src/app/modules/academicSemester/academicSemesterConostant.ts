import {
  IacademicSemesterCode,
  IacademicSemesterTitle,
  IacademicSemesterMonth,
} from './acadimicSemister.interface';

export const academicSemesterTitle: IacademicSemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const academicSemesterCode: IacademicSemesterCode[] = ['01', '02', '03'];

export const academicSemesterMonths: IacademicSemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
