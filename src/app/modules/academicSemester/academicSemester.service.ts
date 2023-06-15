import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { academicSemesterTitleCodeMapper } from './academicSemesterConostant';
import { AcademicSemester } from './academicSemesterModel';
import { IPaginationOptions } from '../../interface/Pagination';
import { IAcademicSemester } from './acadimicSemister.interface';
import { IGenericResponse } from '../../interface/common';
import { paginationHelpers } from '../../../helpers/pagination.helper';
import { SortOrder } from 'mongoose';

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_GATEWAY, 'Invalid Semester Code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemester = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemester,
};
