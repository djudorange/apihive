import Base from '../Base';
import Koa, { Context, Next } from 'koa';
import KoaCompose from 'koa-compose';
import KoaRouter from 'koa-router';
import { Router, Middleware } from '..';
import { create, listen } from '../../output';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      APIHIVE: any; //React.PropsWithChildren<Props>;
    }
  }
}

export interface Props {}

interface ApihiveProps {
  port: number;
  version?: string;
  name?: string;
  description?: string;
}

export default class Apihive extends Base {
  router: KoaRouter;
  props: ApihiveProps;
  app: Koa;
  constructor(props: ApihiveProps = { port: 3000 }) {
    super();
    this.router = new KoaRouter();
    this.props = props;
    this.app = new Koa();
    create(this.props.name, this.props.description, this.props.version);
  }

  render() {
    this.app.use(this.middleware.bind(this));
    const port = this.props.port;
    this.app.listen(this.props.port, function() {
      listen(port);
    });
  }

  middleware(ctx: Context, next: Next) {
    this.children.map(child => {
      if (child instanceof Middleware || child instanceof Router) {
        KoaCompose(child.render())(ctx, next);
      }
    });
  }

  rebuild(paths: string[], child: Middleware | Router) {}
}
