import express from 'express'
import { AcademicFacultyController } from './academicFaculty.controller';
const router = express.Router();

router.post('/create-faculty',AcademicFacultyController.createAcademicFaculty)
router.get('/:id',AcademicFacultyController.getSingleAcademicFaculty)
router.patch('/:id',AcademicFacultyController.updateAcademicFaculty)
router.delete('/:id',AcademicFacultyController.deleteAcademicFaculty)
router.get('/',AcademicFacultyController.getAllFaculty)


export const AcademicFacultyRoutes= router;