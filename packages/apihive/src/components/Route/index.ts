import Base from '../Base';
import { Context, Next } from 'koa';
import { Component, ErrorResponse, Response } from '..';
import accessor, { ErrorApihive } from '../../utils/accessor';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ROUTE: any; //React.PropsWithChildren<Props>;
    }
  }
}

export type Method = 'get' | 'post' | 'put' | 'del';

interface RouteProps {
  path: string;
  method: Method;
  controller?: Function;
  [k: string]: any;
}

export default class Route extends Base {
  props: RouteProps;
  response?: Response = undefined;
  errors: ErrorResponse[] = [];
  constructor(props: RouteProps) {
    super();
    this.props = props;
  }

  getMethod(): Method {
    return this.props.method || 'get';
  }

  getPath() {
    return this.props.path;
  }

  appendChild(child: Component) {
    if (child instanceof Response) {
      this.response = child;
    }
    if (child instanceof ErrorResponse) {
      this.errors.push(child);
    }
  }

  async render(ctx: Context, next: Next) {
    if (!this.props.controller) {
      this.renderResponse(ctx, this.response);
      next();
      return;
    }
    try {
      await this.props.controller(
        accessor(ctx, this.response ? this.response : undefined, this.errors)
      );
      this.renderResponse(ctx, this.response);
    } catch (error) {
      if (error.type && error.type === 'ErrorApihive') {
        this.renderResponse(ctx, error.response);
      }
    }
    next();
  }

  renderResponse(ctx: Context, response?: Response | ErrorResponse) {
    ctx.body = response && response.render ? response.render() : null;
    ctx.status = response && response.getStatus ? response.getStatus() : 200;
  }
}
