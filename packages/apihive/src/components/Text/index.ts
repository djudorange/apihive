import Base from '../Base';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      TEXT: any; //React.PropsWithChildren<Props>;
    }
  }
}

interface TextProps {
  text: string;
}

export default class Text extends Base {
  props: TextProps;
  constructor(props: TextProps) {
    super();
    this.props = props;
  }

  render() {
    return this.props.text;
  }
}
