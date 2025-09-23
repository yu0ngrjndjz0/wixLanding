declare const SUB_DIRECTORY: string;

import Header from './common/header';

import DeviceWatcher from './utils/logic/device-watcher';
import ScrollController from './utils/logic/scroll-controller';

import AnchorLink from './utils/logic/anchor-link';

new DeviceWatcher();
new ScrollController();

const normalizePathname = (pathname) => {
  if (pathname.endsWith('/index.html')) {
    return pathname.replace('/index.html', '/');
  }

  return pathname;
};

const getComponent = async () => {
  const normalizedPath = normalizePathname(window.location.pathname);
  /*
    To avoid confusion, Unique JS names are better. [Under the esBuild environment]

    [bad]
      /index.ts
      /news/index.ts

    [good]
      /index.ts
      /news/news-index.ts
  */

  if (normalizedPath === '/') {
    const module = await import('./pages/index/index');
    new module.default();
  }
};

export default class Main {
  constructor() {
    new Header();
    new AnchorLink();
    getComponent();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new Main();
});
