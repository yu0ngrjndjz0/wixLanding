import EventDispatcher from './event-dispatcher';

/**
 * 使いたい所にimportすると (import Util from './utils/util')
 * Util.**() で関数呼べる。どこからでも使いたい関数は同じような書き方で足していくと良い
 * @export
 * @class Util
 */
export default class Util {
  public static IS_SP: boolean = false;
  public static Dispatcher: EventDispatcher = new EventDispatcher();

  public static HAS_PASSIVE: boolean = false;
  /**
   * Util.log(***)で使うとbuildしてないときだけlog出せる。buildすると自動で出なくなる。
   */
  public static log = (param: any): void => {
    if (process.env.NODE_ENV === 'development') console.log(param);
  };

  /**
   * 上のdir版
   */
  public static dir = (param: any): void => {
    if (process.env.NODE_ENV === 'development') console.dir(param);
  };

  /**
   * 上のwarn版
   */
  public static warn = (param: any): void => {
    if (process.env.NODE_ENV === 'development') console.warn(param);
  };

  /**
   * passive event有無判別。Listenerの第三引数
   * e.g. window.addEventListener('scroll', this.onScroll, Util.isPassive);
   * @readonly
   * @static
   * @type {*}
   */
  public static get isPassive(): boolean | AddEventListenerOptions | undefined {
    return Util.HAS_PASSIVE ? { passive: true } : false;
  }

  public static getQueryAsObject = (): any => {
    const obj: any = {};
    const query: string = location.search;
    const params: string[] = query.split(/[?&]/);

    for (let i = 0, len = params.length; i < len; ++i) {
      const p: string[] = params[i].split('=');
      const key: string = decodeURI(p[0]);
      const val: string = decodeURI(p[1]);

      if (key) {
        obj[key] = val;
      }
    }
    return obj;
  };

  /*
    Set CSS variables from JS.
    Default target: <html>.
    Util.setCssVariable('--vw', '100px');
  */
  public static setCssVariable(target: HTMLElement = document.documentElement, variableName: string, variableValue: string): void {
    target.style.setProperty(variableName, variableValue);
  }

  /**
    When PointerEvent is passed, the cursor is returned at what percentage of XY in the element.
    Useful for some dynamic clipPath, etc.

    e.g.
    elem.addEventListener('pointermove', (e: Event | PointerEvent) => {
      console.log(Util.getPointerPercentage(e));
    });
   */
  public static getPointerPercentage = (e: PointerEvent | Event): any => {
    if (!Util.isPointerEvent(e)) return;
    const target: HTMLElement = e.target as HTMLElement;

    return {
      x: `${Math.round((e.offsetX / target.offsetWidth) * 100)}%`,
      y: `${Math.round((e.offsetY / target.offsetHeight) * 100)}%`,
    };
  };

  public static isPointerEvent(event: Event | PointerEvent): event is PointerEvent {
    return (event as PointerEvent).pointerType !== undefined;
  }
}

/* =================================================================== */

try {
  // tslint:disable-next-line
  const testFunc = () => {
    // console.log('');
  };
  const opts = Object.defineProperty({}, 'passive', {
    get() {
      Util.HAS_PASSIVE = true;
      return true;
    },
  });
  window.addEventListener('test', testFunc, opts);
  window.removeEventListener('test', testFunc);
} catch (e) {
  Util.HAS_PASSIVE = false;
}
