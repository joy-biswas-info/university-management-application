import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAcademicSemester } from './acadimicSemister.interface';
import { pickPagination } from '../../../shared/pick';
import { paginationField } from '../../../constant/pagination';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemesterData
    );
    sendResponse<IAcademicSemester>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic semester created successfully',
      data: result,
    });
    next();
  }
);

const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pickPagination(req.query, paginationField);

    const result = await AcademicSemesterService.getAllSemester(
      paginationOptions
    );

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All semester',
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
};
