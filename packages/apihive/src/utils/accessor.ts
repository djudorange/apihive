import { Context } from 'koa';
import { Response, ErrorResponse } from '../components';
import { v4 as uuid } from 'uuid';

export interface Accessor {
  getContext: () => Context;
  getParams: () => any;
  response: Function;
  error: (n: string) => ErrorApihive | Error;
}

export class ErrorApihive extends Error {
  response: ErrorResponse;
  type: string = 'ErrorApihive';
  constructor(errorResponse: ErrorResponse, context: any) {
    super(errorResponse.props.name);
    this.response = errorResponse;
    this.response.setContext({
      errorId: uuid(),
      ...context
    });
  }
}

export default (
  ctx: Context,
  response?: Response,
  errors?: ErrorResponse[]
): Accessor => {
  if (!response) {
    throw new Error(
      'No response defined. Please Add a component like <Response status={200}/> (for example)'
    );
  }

  return {
    getContext: () => ctx,
    getParams: () => '',
    response: response.setResponse.bind(response),
    error: (n: string, context?: any) => {
      let error;
      if (errors) {
        const er = errors.find(({ name }: ErrorResponse) => n === name);
        if (!er) {
          error = new Error(`no error found for ${n}`);
        } else {
          error = new ErrorApihive(er, context);
        }
      } else {
        error = new Error(`no error defined for ${n}`);
      }

      return error;
    }
  };
};
