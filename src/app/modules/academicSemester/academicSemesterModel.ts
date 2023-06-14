import { Schema, model } from 'mongoose';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './acadimicSemister.interface';
import {
  academicSemesterMonths,
  academicSemesterCode,
  academicSemesterTitle,
} from './academicSemesterConostant';

const academicSemesterSchema = new Schema<IAcademicSemester>({
  title: {
    type: String,
    required: true,
    enum: academicSemesterTitle,
  },
  year: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
    enum: academicSemesterCode,
  },
  startMonth: {
    type: String,
    required: true,
    enum: academicSemesterMonths,
  },
  endMonth: {
    type: String,
    required: true,
    enum: academicSemesterMonths,
  },
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
