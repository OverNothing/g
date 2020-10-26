import { document as myDocument } from '@antv/g-adapter-miniprogram';

// 全局设置一个唯一离屏的 ctx，用于计算 isPointInPath
let offScreenCtx = null;
export function getOffScreenContext() {
  if (!offScreenCtx) {
    const canvas = myDocument.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    offScreenCtx = canvas.getContext('2d');
  }
  return offScreenCtx;
}
