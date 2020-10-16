import Event from '../Event';
import { getCanvas2D } from '../register';
import document from '../document';

class TouchEvent extends Event {
  touches: any[];
  targetTouches: any[];
  changedTouches: any[];

  constructor(type) {
    super(type);

    this.touches = [];
    this.targetTouches = [];
    this.changedTouches = [];

    this.target = getCanvas2D();
    this.currentTarget = getCanvas2D();
  }
}

function mapEvent(event) {
  const { x = 0, y = 0, clientX = 0, clientY = 0 } = event || {};
  // 小程序不支持Object.hasOwnProperty
  // (抹平不同的view事件)[https://docs.alipay.com/mini/framework/event-object]
  if (Object.keys(event).indexOf('x') !== -1) {
    event.pageX = event.clientX = x;
    event.pageY = event.clientY = y;
  } else {
    event.x = clientX;
    event.y = clientY;
  }
}

function eventHandlerFactory(type) {
  return (rawEvent) => {
    const event = new TouchEvent(type);

    event.changedTouches = rawEvent.changedTouches;
    event.touches = rawEvent.touches;
    event.targetTouches = Array.prototype.slice.call(rawEvent.touches);
    event.timeStamp = rawEvent.timeStamp;

    event.changedTouches.forEach((e) => mapEvent(e));
    event.touches.forEach((e) => mapEvent(e));
    event.targetTouches.forEach((e) => mapEvent(e));

    document.dispatchEvent(event);
  };
}

const dispatchTouchStart = eventHandlerFactory('touchstart');
const dispatchTouchMove = eventHandlerFactory('touchmove');
const dispatchTouchEnd = eventHandlerFactory('touchend');
export { dispatchTouchStart, dispatchTouchMove, dispatchTouchEnd };
