import {
  Apihive,
  Router,
  Route,
  Response,
  Text,
  Middleware,
  ErrorResponse
} from '../components';
import Root from '../components/Root';

export function createElement(type: string, props?: any) {
  switch (type) {
    case 'ROOT':
      return new Root();
    case 'APIHIVE':
      return new Apihive(props);
    case 'ROUTER':
      return new Router();
    case 'ROUTE':
      return new Route(props);
    case 'RESPONSE':
      return new Response(props);
    case 'TEXT':
      return new Text(props);
    case 'MIDDLEWARE':
      return new Middleware(props);
    case 'ERRORRESPONSE':
      return new ErrorResponse(props);
  }

  throw new Error('Tag not supported');
}
