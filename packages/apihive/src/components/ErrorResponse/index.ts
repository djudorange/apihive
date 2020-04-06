import Base from '../Base';
import { Component } from '..';
import Text from '../Text';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ERRORRESPONSE: any; //React.PropsWithChildren<Props>;
    }
  }
}

interface ErrorResponseProps {
  status: number;
  name: string;
  appCode?: number;
}

export default class ErrorResponse extends Base {
  props: ErrorResponseProps;
  name: string;
  context: any;
  message: string = 'Error';
  constructor(props: ErrorResponseProps) {
    super();
    this.props = props;
    this.name = props.name;
  }

  appendChild(child: Component) {
    if (child instanceof Text) {
      this.message = child.props.text;
    }
  }

  render() {
    return {
      app_code: this.props.appCode,
      message: this.message,
      ...this.context
    };
  }

  setContext(context: any) {
    this.context = context;
  }

  getStatus() {
    return this.props.status;
  }
}
