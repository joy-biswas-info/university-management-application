import mongoose, { CastError } from 'mongoose'
import { IGenericErrorResponse } from '../app/interface/common'
import { IGenericErrorMessage } from '../app/interface/GenericErrorMessage'

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      }
    }
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'validation Error',
    errorMessages: errors,
  }
}

export default handleValidationError
