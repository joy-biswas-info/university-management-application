import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/pagination.helper";
import { IPaginationOptions } from "../../interface/Pagination";
import { IAcademicSemesterFilter, IGenericResponse } from "../../interface/common";
import { IAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFacultyModel"

const createAcademicFaculty = async (payload:IAcademicFaculty)=>{
    const result = await AcademicFaculty.create(payload);
    return result
}
const getAcademicFaculty = async (
    filters: IAcademicSemesterFilter,
    paginationOptions: IPaginationOptions
  ): Promise<IGenericResponse<IAcademicFaculty[]>> => {
    // For Filters & search
    const { searchTerm,...filtersData } = filters;
    const academicSemesterSearchableFields = ['title'];
    const andCondition = [];
  
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
          [field]: {
            $regex:value,
            $options:'i'
          }
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
    const result = await AcademicFaculty.find(whereCondition)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
  
    const total = await AcademicFaculty.countDocuments();
  
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  };

  
const updateAcademicFaculty = async (id:string,payload:IAcademicFaculty)=>{
    const result = await AcademicFaculty.findByIdAndUpdate({_id:id},payload,{new:true});
    return result
}
const deleteAcademicFaculty = async (id:string)=>{
    const result = await AcademicFaculty.findByIdAndDelete(id);
    return result
}
const getSingleAcademicFaculty = async (id:string)=>{
    const result = await AcademicFaculty.findByIdAndDelete(id);
    return result
}


export const AcademicFacultyService={
    createAcademicFaculty,
    getAcademicFaculty,
    updateAcademicFaculty,
    deleteAcademicFaculty,getSingleAcademicFaculty

}