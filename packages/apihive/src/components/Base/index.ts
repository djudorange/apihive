import { Component } from '..';

export default class Base implements Component {
  children: Component[];
  constructor() {
    this.children = [];
  }

  appendChild(child: Component) {
    this.children.push(child);
  }

  removeChild(child: Component) {
    const index = this.children.indexOf(child);
    this.children.slice(index, 1);
  }
}
