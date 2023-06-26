import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAcademicSemester } from './acadimicSemister.interface';
import { pick } from '../../../shared/pick';
import { paginationField } from '../../../constant/pagination';

const createSemester = catchAsync(async (req: Request, res: Response) => {
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
});

const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Search functionality
    const filters = pick(req.query, ['searchTerm', 'title', 'code', 'year']);

    // pagination
    const paginationOptions = pick(req.query, paginationField);

    const result = await AcademicSemesterService.getAllSemester(
      filters,
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

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.getSingleSemester(id as string);

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester get successfully',
    meta: result?.meta,
    data: result,
  });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload: Partial<IAcademicSemester> = req.body;
  const result = await AcademicSemesterService.updateSemester(
    id as string,
    payload
  );

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester get successfully',
    meta: result?.meta,
    data: result,
  });
});
const deleteSemester = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.getSingleSemester(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester deleted successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
