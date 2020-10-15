import devicePixelRatio from './devicePixelRatio';
import document from './document';
import Element from './Element';
import Event from './Event';
import EventTarget from './EventTarget';
import HTMLCanvasElement from './HTMLCanvasElement';
import HTMLElement from './HTMLElement';
import Node from './Node';

const window = {
  devicePixelRatio,
  document,
  Element,
  Event,
  EventTarget,
  HTMLCanvasElement,
  HTMLElement,
  Node,
  addEventListener(type, listener, options = {}) {
    document.addEventListener(type, listener, options);
  },
  removeEventListener(type, listener) {
    document.removeEventListener(type, listener);
  },
  dispatchEvent(event: Event) {
    document.dispatchEvent(event);
  },
};

export { window, devicePixelRatio, document, Element, Event, EventTarget, HTMLCanvasElement, HTMLElement, Node };

export { registerCanvas2D } from './register';

export * from './EventIniter/index';
