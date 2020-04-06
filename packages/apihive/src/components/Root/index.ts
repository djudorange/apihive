import { Component } from '..';
import Base from '../Base';

export default class Root extends Base {
  constructor() {
    super();
  }

  render() {
    this.children.forEach(child => {
      child.render ? child.render() : null;
    });
  }
}
