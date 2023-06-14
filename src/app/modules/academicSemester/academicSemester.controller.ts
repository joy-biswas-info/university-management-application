import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester: RequestHandler = async (req, res, next) => {
  const { ...academicSemesterData } = req.body;
  try {
    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemesterData
    );
    res.status(200).json({
      success: true,
      message: 'Successfully create Acedemic Semester',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterController = {
  createSemester,
};
