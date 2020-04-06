import Base from '../Base';
import KoaRouter from 'koa-router';
import KoaCompose from 'koa-compose';
import { Route, Component } from '..';

interface RouterProps {
  children: any[];
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ROUTER: any; //{ children?: Component | string }; //React.PropsWithChildren<RouterProps>;
    }
  }
}

export default class Router extends Base {
  router: KoaRouter;
  routes: string[] = [];
  constructor() {
    super();
    this.router = new KoaRouter();
  }

  appendChild(child: Component) {
    super.appendChild(child);
    if (child instanceof Route) {
      this.routes.push(child.getPath());
    }

    if (child instanceof Route) {
      const method: string = child.getMethod().toLowerCase();
      switch (method) {
        case 'get':
          this.router.get(child.getPath(), child.render.bind(child));
          break;
        case 'put':
          this.router.put(child.getPath(), child.render.bind(child));
          break;
        case 'post':
          this.router.post(child.getPath(), child.render.bind(child));
          break;
        case 'del':
          this.router.del(child.getPath(), child.render.bind(child));
          break;
      }
    }
  }

  getPaths() {
    return this.routes;
  }

  render() {
    return [this.router.routes(), this.router.allowedMethods()];
  }
}
