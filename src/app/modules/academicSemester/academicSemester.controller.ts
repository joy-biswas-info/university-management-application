import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemesterData
    );
    next();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic semester created successfully',
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  createSemester,
};