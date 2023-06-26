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
router.patch('/:id',validateRequest(academicSemesterValidation.updateAcademicSemesterZodSchema),AcademicSemesterController.updateSemester);
router.delete('/:id', AcademicSemesterController.deleteSemester);
router.get('/:id', AcademicSemesterController.getSingleSemester);
router.get('/', AcademicSemesterController.getAllSemester);

export const AcademicSemesterRoutes = router;
