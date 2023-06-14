import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';
const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

export const AcademicSemesterRoutes = router;
