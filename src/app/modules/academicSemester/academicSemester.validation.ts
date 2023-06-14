import { z } from 'zod';
import {
  academicSemesterMonths,
  academicSemesterCode,
} from './academicSemesterConostant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(['Autumn', 'Summer', 'Fall'], {
      required_error: 'Title is required',
    }),
    year: z.number({ required_error: 'Year is required' }),
    code: z.enum([...academicSemesterCode] as [string, ...string[]]),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'Start Month is required',
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'End Month is required',
    }),
  }),
});

export const academicSemesterValidation = {
  createAcademicSemesterZodSchema,
};
