import { selectorAll } from '../utils/helper/function-helper';
import Util from '../utils/util';

export default class Header {
  private target: HTMLElement | null;
  private header: HTMLElement | null;
  private menuHolder: HTMLElement | null;
  private winWidth: number;
  private winHeight: number;
  private isOpen: boolean;
  private openSubTriggers: HTMLElement[];

  constructor() {
    this.target = document.getElementById('js-hamburger');
    this.header = document.getElementById('header');
    this.menuHolder = document.getElementById('js-menu');
    this.openSubTriggers = selectorAll('.toggleable');
    this.isOpen = false;
    this.winWidth = window.innerWidth;
    this.winHeight = window.innerHeight;
    this.init();
  }

  private init = () => {
    if (!this.target) return;
    this.activeMenu();
    this.handleToggleSub();
    this.addClickEventsToLink();
    this.target.addEventListener('click', this.handleToggleBurger, false);

    window.addEventListener(
      'resize',
      () => {
        if (this.winWidth !== window.innerWidth) {
          this.winWidth = window.innerWidth;
          this.Sticky();
          this.changeMenuDevice();
        }
        if (this.winHeight !== window.innerHeight) {
          this.setHeightResize();
          this.winHeight = window.innerHeight;
        }
      },
      false
    );
    window.addEventListener('load', this.Sticky, false);
    window.addEventListener('scroll', this.Sticky, false);
  };

  private addClickEventsToLink() {
    const menus: HTMLElement[] = selectorAll('.header__menu ul a:not(.toggleable)');
    menus.forEach((menu) => {
      menu.addEventListener('click', () => {
        Util.Dispatcher.dispatchEvent('SCROLL_RELEASE');
        this.handleToggleBurger();
      });
    });
  }

  private handleToggleSub = () => {
    this.openSubTriggers.forEach((togButton) => {
      const subHolder = togButton.nextElementSibling as HTMLElement;
      // Default cases
      if (togButton.classList.contains('expanded')) {
        subHolder.style.maxHeight = `${subHolder.scrollHeight}px`;
      } else {
        subHolder.style.maxHeight = '0';
      }

      togButton.addEventListener('click', function () {
        togButton.classList.toggle('expanded');

        if (togButton.classList.contains('expanded')) {
          subHolder.style.maxHeight = `${subHolder.scrollHeight}px`;
        } else {
          subHolder.style.maxHeight = '0';
        }
      });
    });
  };

  private handleToggleBurger = () => {
    if (!this.target || !this.header || this.winWidth > 768) return;
    this.setHeightMenu();
    if (this.target.classList.contains('open')) {
      this.isOpen = false;
      this.target.classList.remove('open');
      this.header.classList.remove('active');
      this.target.classList.add('close');
      Util.Dispatcher.dispatchEvent('SCROLL_RELEASE');
      document.documentElement.style.scrollBehavior = 'smooth';
    } else {
      this.isOpen = true;
      this.target.classList.add('open');
      this.header.classList.add('active');
      this.target.classList.remove('close');
      Util.Dispatcher.dispatchEvent('SCROLL_LOCK');
      document.documentElement.style.scrollBehavior = 'auto';
    }
  };

  private Sticky = () => {
    if (!this.header) return;

    if (window.pageYOffset > 0) {
      this.header?.classList.add('fixed');
    } else {
      this.header?.classList.remove('fixed');
    }
  };

  private setHeightMenu = () => {
    if (this.menuHolder) {
      const timing: number = 0.4;
      const winHeight: number = window.innerHeight || 0;
      // const headerHeight: number = this.header?.clientHeight || 0;
      // const navHeight: number = winHeight - headerHeight;
      this.menuHolder.style.transition = `height ${timing * winHeight}ms linear`;
      if (this.isOpen) {
        this.menuHolder.style.height = '';
      } else {
        this.menuHolder.style.height = `${winHeight}px`;
        this.menuHolder.style.visibility = 'visible';
      }
      this.timeOutClean(timing * winHeight);
    }
  };

  private timeOutClean = (timing: number) => {
    setTimeout(() => {
      if (this.menuHolder) {
        this.menuHolder.style.transition = '';
        if (this.isOpen) {
          this.menuHolder.style.overflow = 'auto';
        } else {
          this.menuHolder.style.overflow = '';
          this.menuHolder.style.visibility = '';
          this.menuHolder.scrollTop = 0;
        }
      }
    }, timing);
  };

  private changeMenuDevice = () => {
    const winWidth: number = window.innerWidth || 0;
    if (winWidth > 768) {
      this.removeStyle();
      Util.Dispatcher.dispatchEvent('SCROLL_RELEASE');
    } else {
      this.setHeightResize();
    }
  };

  private removeStyle = () => {
    if (this.menuHolder) {
      this.menuHolder.style.height = '';
      this.menuHolder.style.overflow = '';
      this.menuHolder.style.visibility = '';
      this.menuHolder.scrollTop = 0;
    }
  };

  private setHeightResize = () => {
    if (this.menuHolder && this.winWidth <= 768) {
      const winHeight: number = window.innerHeight || 0;
      // const headerHeight: number = this.header?.clientHeight || 0;
      // const navHeight: number = winHeight - headerHeight;
      if (this.isOpen) {
        document.body.style.overflow = 'hidden';
        this.menuHolder.style.height = `${winHeight}px`;
        this.menuHolder.style.visibility = 'visible';
        this.menuHolder.style.overflow = 'auto';
        Util.Dispatcher.dispatchEvent('SCROLL_LOCK');
      }
    }
  };

  private activeMenu = () => {
    const menus: HTMLElement[] = selectorAll('.header__nav>ul>li');
    const url = document.location.pathname;
    const urlLength = url.split('/').length > 2;
    const pathname = urlLength ? url.substring(0, url.lastIndexOf('/') + 1) : url.replace('index.html', '');

    for (const menu of menus) {
      const aLink = menu.querySelector('a') as HTMLAnchorElement;
      const isLocationMatched: boolean = aLink.getAttribute('href') === pathname || aLink.getAttribute('data-name') === pathname;

      if (isLocationMatched) {
        menu.classList.add('active');
      } else {
        menu.classList.remove('active');
      }
    }
  };
}
