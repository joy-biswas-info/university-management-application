import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { academicSemesterTitleCodeMapper } from './academicSemesterConostant';
import { AcademicSemester } from './academicSemesterModel';
import { IPaginationOptions } from '../../interface/Pagination';
import { IAcademicSemester } from './acadimicSemister.interface';
import {
  IAcademicSemesterFilter,
  IGenericResponse,
} from '../../interface/common';
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
  filters: IAcademicSemesterFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  // For Filters & search
  const { searchTerm,...filtersData } = filters;
  const academicSemesterSearchableFields = ['title', 'code', 'year'];
  const andCondition = [{}];

  if (searchTerm) {
    andCondition.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm || '',
          $options: 'i',
        },
      })),
    });
  }

  // adject match 
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value
      }))
    });
  }

  const whereCondition = andCondition.length>0?{$and:andCondition}:{}
  

  // For Pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const result = await AcademicSemester.find(whereCondition)
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

const getSingleSemester = async (id:string) => {
  const result = await AcademicSemester.findById(id);
    return result;
};

const updateSemester = async(id:string,payload:Partial<IAcademicSemester>)=>{
  if (payload.title&&payload.code&&academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_GATEWAY, 'Invalid Semester Code');
  }
 const result = await AcademicSemester.findOneAndUpdate({_id:id},payload,{new:true});
 return result
}

const deleteSemester =async(id:string)=>{
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result
}



export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
