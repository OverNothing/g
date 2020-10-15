import { isMy, isWx } from './util';
declare var my: any;
declare var wx: any;

// 全局设置一个唯一离屏的 ctx，用于计算 isPointInPath
let offScreenCtx = null;
export function getOffScreenContext() {
  if (offScreenCtx) {
    return offScreenCtx;
  }
  if (isMy) {
    // 初始化
    const offscreenCanvas = my._createOffscreenCanvas(1, 1);
    // 获取2D上下文
    offScreenCtx = offscreenCanvas.getContext('2d');
  } else if (isWx) {
    // 初始化
    const offscreenCanvas = wx.createOffscreenCanvas(1, 1);
    // 获取2D上下文
    offScreenCtx = offscreenCanvas.getContext('2d');
  } else {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    offScreenCtx = canvas.getContext('2d');
  }
  return offScreenCtx;
}
