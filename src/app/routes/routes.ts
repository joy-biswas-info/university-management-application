import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import {AcademicFacultyRoutes} from '../modules/academicFaculty/academicFaculty.route'
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users/',
    route: UserRoutes,
  },
  {
    path: '/semester/',
    route: AcademicSemesterRoutes,
  },{
    path:"/faculty/",
    route:AcademicFacultyRoutes,
  },
  {
    path: '/',
    route: AcademicSemesterRoutes,
  },
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
