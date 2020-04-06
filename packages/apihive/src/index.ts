import { createElement } from './renderer';
import { render } from './render';
import { Context } from 'koa';
import { Accessor } from './utils/accessor';

const Apihive = 'APIHIVE';
const Router = 'ROUTER';
const Route = 'ROUTE';
const Response = 'RESPONSE';
const Text = 'TEXT';
const Middleware = 'MIDDLEWARE';
const ErrorResponse = 'ERRORRESPONSE';

export {
  createElement,
  render,
  Apihive,
  Router,
  Route,
  Response,
  Text,
  Middleware,
  Context,
  Accessor,
  ErrorResponse
};
