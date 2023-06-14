import { AcademicSemester } from './academicSemesterModel';
import { IAcademicSemester } from './acadimicSemister.interface';

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemester,
};
