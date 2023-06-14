import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await UserService.createUser(user);

    next();
    sendResponse(res, {
      success: true,
      message: 'Successfully create user',
      statusCode: httpStatus.OK,
      data: result,
    });
  }
);

export const UserController = {
  createUser,
};
