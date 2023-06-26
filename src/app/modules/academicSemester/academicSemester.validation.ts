import { z } from 'zod';
import {
  academicSemesterMonths,
  academicSemesterCode,
  academicSemesterTitle,
} from './academicSemesterConostant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitle] as [string,...string[]], {
      required_error: 'Title is required',
    }),
    year: z.string({ required_error: 'Year is required' }),
    code: z.enum([...academicSemesterCode] as [string, ...string[]], {
      required_error: 'Invalid semester code',
    }),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'Start Month is required',
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'End Month is required',
    }),
  }),
})


const updateAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitle] as [string,...string[]]).optional(),
    year: z.string({ required_error: 'Year is required' }).optional(),
    code: z.enum([...academicSemesterCode] as [string, ...string[]]).optional(),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]]).optional(),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]]).optional(),
  }),
}).refine(
  (data)=>(data.body.title && data.body.code)||(!data.body.title && !data.body.code),{
    message:'Provide both title or code or nither'
  }
)

export const academicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
