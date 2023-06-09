import { User } from './user.model'
import { IUser } from './users.interface'
import { generateUserId } from './users.utils'
import config from '../../../config'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto incrimental id
  const id = await generateUserId()
  user.id = id

  // default password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const creadedUser = await User.create(user)
  if (!creadedUser) {
    throw new Error('Failed to create user!')
  }
  return creadedUser
}

export default {
  createUser,
}
