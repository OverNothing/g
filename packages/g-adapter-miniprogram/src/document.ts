import HTMLElement from './HTMLElement';
import { getCanvas2D, getOffscreenCanvas2D } from './register';
import Event from './Event';

class Body extends HTMLElement {
  constructor() {
    // 为了性能, 此处不按照标准的DOM层级关系设计
    // 将 body 设置为 0级, parent元素为null
    super('body', 0);
  }

  addEventListener(type, listener, options = {}) {
    document.addEventListener(type, listener, options);
  }

  removeEventListener(type, listener) {
    document.removeEventListener(type, listener);
  }

  dispatchEvent(event: Event) {
    document.dispatchEvent(event);
  }
}

class DocumentElement extends HTMLElement {
  constructor() {
    super('html', 0);
  }

  addEventListener(type, listener, options = {}) {
    document.addEventListener(type, listener, options);
  }

  removeEventListener(type, listener) {
    document.removeEventListener(type, listener);
  }

  dispatchEvent(event: Event) {
    document.dispatchEvent(event);
  }
}

const events = {};
let isCanvasInited = false;

const document = {
  readyState: 'complete',
  visibilityState: 'visible', // 'visible' , 'hidden'
  hidden: false,
  fullscreen: true,

  scripts: [],
  style: {},

  ontouchstart: null,
  ontouchmove: null,
  ontouchend: null,
  onvisibilitychange: null,

  parentNode: null,
  parentElement: null,
  head: null,
  body: null,
  documentElement: null,
  createElement(tagName) {
    tagName = tagName.toLowerCase();
    if (tagName === 'canvas') {
      if (isCanvasInited) {
        return getOffscreenCanvas2D();
      }
      isCanvasInited = true;
      return getCanvas2D();
    }

    return new HTMLElement(tagName);
  },

  createElementNS(nameSpace, tagName) {
    return this.createElement(tagName);
  },

  createTextNode(text) {
    // TODO: Do we need the TextNode Class ???
    return text;
  },

  getElementById(id) {
    const canvas2D = getCanvas2D();
    if (id === canvas2D.id) {
      return canvas2D;
    }
    return new HTMLElement();
  },

  getElementsByTagName(tagName) {
    tagName = tagName.toLowerCase();
    switch (tagName) {
      case 'head':
        return [document.head];
      case 'body':
        return [document.body];
      case 'canvas':
        return [getCanvas2D()];
      default:
        return [];
    }
  },

  getElementsByTagNameNS(nameSpace, tagName) {
    return this.getElementsByTagName(tagName);
  },

  getElementsByName(tagName) {
    tagName = tagName.toLowerCase();
    switch (tagName) {
      case 'head':
        return [document.head];
      case 'body':
        return [document.body];
      case 'canvas':
        return [getCanvas2D()];
      default:
        return [];
    }
  },

  querySelector(query) {
    query = query.toLowerCase();
    const canvas2D = getCanvas2D();
    switch (query) {
      case 'head':
        return document.head;
      case 'body':
        return document.body;
      case 'canvas':
        return canvas2D;
      case `#${canvas2D.id}`:
        return canvas2D;
      default:
        return null;
    }
  },

  querySelectorAll(query) {
    query = query.toLowerCase();
    switch (query) {
      case 'head':
        return document.head;
      case 'body':
        return document.body;
      case 'canvas':
        return getCanvas2D();
      default:
        return [];
    }
  },

  addEventListener(type, listener, options) {
    if (!events[type]) {
      events[type] = [];
    }
    events[type].push(listener);
  },

  removeEventListener(type, listener) {
    const listeners = events[type];

    if (listeners && listeners.length > 0) {
      for (let i = listeners.length; i--; i > 0) {
        if (listeners[i] === listener) {
          listeners.splice(i, 1);
          break;
        }
      }
    }
  },

  dispatchEvent(event: Event) {
    const type = event.type;
    const listeners = events[type];

    if (listeners) {
      for (let i = 0; i < listeners.length; i++) {
        listeners[i](event);
      }
    }

    if (event.target && typeof event.target[`on${type}`] === 'function') {
      event.target[`on${type}`](event);
    }
  },
};

document.documentElement = new DocumentElement();
document.head = new HTMLElement('head');
document.body = new Body();

export default document;
