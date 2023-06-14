import { User } from './user.model';
import { IUser } from './user.interface';
import { generateUserId } from './user.utils';
import config from '../../../config';
import ApiError from '../../../errors/ApiErrors';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto incrimental id
  const id = await generateUserId();
  user.id = id;

  // default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  const creadedUser = await User.create(user);
  if (!creadedUser) {
    throw new ApiError(400, 'Failed to create user!');
  }
  return creadedUser;
};

export const UserService = {
  createUser,
};
