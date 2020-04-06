import Base from '../Base';
import KoaRouter, { IMiddleware } from 'koa-router';
import { Component, Router, Apihive } from '..';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      MIDDLEWARE: any; //React.PropsWithChildren<Props>;
    }
  }
}

interface MiddlewareProps {
  use: any;
}

export default class Middleware extends Base {
  router: KoaRouter;
  props: MiddlewareProps;
  routes: string[] = [];
  parent: Middleware | Apihive | null = null;
  constructor(props: MiddlewareProps) {
    super();
    this.router = new KoaRouter();
    this.props = props;
  }

  appendChild(child: Component) {
    super.appendChild(child);
    if (child instanceof Middleware || child instanceof Router) {
      const paths = child.getPaths();
      this.routes = [...this.routes, ...paths];
      this.router.all(paths, ...(<IMiddleware[]>child.render()));
      this.triggerParentRebuildWith(paths);
    }
  }

  removeChild(child: Component) {
    if (child instanceof Router) {
      const paths = child.getPaths();
      this.router.stack = this.router.stack.filter(
        layer => !paths.includes(layer.path)
      );
    }
  }

  triggerParentRebuildWith(paths: string[]) {
    if (this.parent && this.parent.rebuild) {
      this.parent.rebuild(paths, this);
    }
  }

  rebuild(paths: string[], child: Middleware | Router) {
    const pathsToAdd = paths.filter(path => !this.routes.includes(path));
    this.router.all(pathsToAdd, ...(<IMiddleware[]>child.render()));
  }

  getPaths() {
    return this.routes;
  }

  render() {
    return [this.props.use, this.router.routes()];
  }
}
