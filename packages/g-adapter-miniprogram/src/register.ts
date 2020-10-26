import devicePixelRatio from './devicePixelRatio';
import * as Mixin from './util/mixin';
import document from './document';

declare let my: any;

/**
 * 同步和异步都需要的数据
 */
let canvas2D: any = {};
let offscreenCanvas2D: any = null;

/**
 * 异步注册2Dcanvas
 */
function registerCanvas2D(ctx, id: string, width: number = 750, height: number = 450) {
  canvas2D = {
    width,
    height,
    clientWidth: width / devicePixelRatio,
    clientHeight: height / devicePixelRatio,
    id,
    type: 'canvas',
  };

  if (!('tagName' in canvas2D)) {
    canvas2D.tagName = 'CANVAS';
  }

  Mixin.parentNode(canvas2D);
  Mixin.style(canvas2D);
  Mixin.classList(canvas2D);
  Mixin.clientRegion(canvas2D);
  Mixin.offsetRegion(canvas2D);

  canvas2D.getContext = function (type) {
    if (type === '2d') {
      return ctx;
    }
  };
  canvas2D.focus = function () {};
  canvas2D.blur = function () {};

  canvas2D.addEventListener = function (type, listener, options = {}) {
    document.addEventListener(type, listener, options);
  };

  canvas2D.removeEventListener = function (type, listener) {
    document.removeEventListener(type, listener);
  };

  canvas2D.dispatchEvent = function (event: Event) {
    document.dispatchEvent(event);
  };
}

function getOffscreenCanvas2D() {
  if (offscreenCanvas2D) {
    return offscreenCanvas2D;
  }
  // 初始化
  offscreenCanvas2D = my._createOffscreenCanvas(1, 1);
  return offscreenCanvas2D;
}

/**
 * 异步获取2Dcanvas
 */
function getCanvas2D() {
  return canvas2D;
}

export { registerCanvas2D, getCanvas2D, getOffscreenCanvas2D };
