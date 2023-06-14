import { IGenericErrorMessage } from './GenericErrorMessage';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
