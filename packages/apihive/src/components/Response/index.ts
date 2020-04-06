import Base from '../Base';
import { Component, ErrorResponse } from '..';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      RESPONSE: any; //React.PropsWithChildren<Props>;
    }
  }
}

interface ResponseProps {
  status: number;
}

export default class Response extends Base {
  props: ResponseProps;
  response: any;
  constructor(props: ResponseProps) {
    super();
    this.props = props;
  }

  setResponse(obj: any) {
    this.response = obj;
  }

  getStatus() {
    return this.props.status;
  }

  render() {
    if (this.children.length === 0 && this.response) {
      return this.response;
    }
    const body = this.children.map(child => {
      return child.render ? child.render() : null;
    });
    return body.length == 1 ? body[0] : body;
  }
}
