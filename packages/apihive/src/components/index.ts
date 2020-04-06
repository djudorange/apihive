import Apihive from './Apihive';
import Router from './Router';
import Route from './Route';
import Response from './Response';
import ErrorResponse from './ErrorResponse';
import Text from './Text';
import Middleware from './Middleware';

export interface Component {
  element?: any;
  node?: any;
  parent?: Component;
  children?: Component[];
  updateProps?: (payload: object) => void;
  appendChild: (child: Component) => void;
  removeChild: (child: Component) => void;
  insertChild?: (child: Component, beforeChild: Component) => void;
  render?: () => any;
}

export { Apihive, Router, Route, Response, Text, Middleware, ErrorResponse };
