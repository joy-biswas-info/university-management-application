import { Model } from 'mongoose';

export type IacademicSemesterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IacademicSemesterTitle = 'Autumn' | 'Summer' | 'Fall';
export type IacademicSemesterCode = '01' | '02' | '03';

export type IAcademicSemester = {
  title: IacademicSemesterTitle;
  year: string;
  code: IacademicSemesterCode;
  startMonth: IacademicSemesterMonth;
  endMonth: IacademicSemesterMonth;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;
