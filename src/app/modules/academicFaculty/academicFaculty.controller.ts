import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicFacultyService } from './academicFaculty.service';
import { IAcademicFaculty } from './academicFaculty.interface';
import { pick } from '../../../shared/pick';
import { paginationField } from '../../../constant/pagination';
import { Request, Response } from 'express';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AcademicFacultyService.createAcademicFaculty(payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Faculty create successfully',
    data: result,
  });
});

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  // Search functionality
  const filters = pick(req.query, ['searchTerm', 'title']);

  // pagination
  const paginationOptions = pick(req.query, paginationField);

  const result = await AcademicFacultyService.getAcademicFaculty(
    filters,
    paginationOptions
  );
  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All semester',
    meta: result.meta,
    data: result.data,
  });
});

const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload: IAcademicFaculty = req.body;
    const result = await AcademicFacultyService.updateAcademicFaculty(
      id as string,
      payload
    );
    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty Updated successfully',
      data: result,
    });
  }
);

const deleteAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AcademicFacultyService.deleteAcademicFaculty(
      id as string
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester deleted successfully',
      data: result,
    });
  }
);
const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AcademicFacultyService.deleteAcademicFaculty(
      id as string
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester deleted successfully',
      data: result,
    });
  }
);

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
  getSingleAcademicFaculty,
};
