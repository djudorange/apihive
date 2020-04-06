import { createElement } from '../renderer';
import * as ReactReconciler from 'react-reconciler';
import DesktopRenderer from '../reconciler';
import { init } from '../output';
export let container: ReactReconciler.FiberRoot;

export let ROOT_NODE: any = {};

export function render(element: any) {
  init();
  ROOT_NODE = createElement('ROOT', {});
  container = DesktopRenderer.createContainer(ROOT_NODE, false, false);

  DesktopRenderer.updateContainer(element, container, null, () => null);

  return ROOT_NODE.render();
}
