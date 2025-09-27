import Parallax from 'parallax-js';
// import {animate} from 'animejs';

export default class Index {
  /**
   * Creates an instance of Index.
   */
  private changeSection: Parallax | null;
  private mvSection: Parallax | null;
  private winWidth: number;
  private mobileChangeScrollHandler?: () => void;
  constructor() {

    this.changeSection = null;
    this.mvSection = null;
    this.winWidth = window.innerWidth;
    
    
    const partners = document.getElementById('partners');
    new Parallax(partners, {
      selector: '.layer',
      pointerEvents: true,
      relativeInput: true,
      hoverOnly: true,
      frictionX: .02,
      frictionY: .02,
    });

    this.parallaxMV();
    this.initPenScrollAnimation();
    this.initParallaxChange();
    this.handleParallaxChange();

     window.addEventListener(
       'resize',
       () => {
         if (this.winWidth !== window.innerWidth) {
           this.winWidth = window.innerWidth;
           // this.Sticky();
           this.initParallaxChange();
           this.handleParallaxChange();
         }
       },
       false
     );
  }

  private parallaxMV = () => {
    const mv = document.querySelector('.mv');
    const mvWrapper = document.querySelector('.mv__bg') as HTMLElement;
    const mvtext = document.querySelector('.mv__item__text__inner') as HTMLElement;

    if (!mv || !mvWrapper) return;
    const mvtextHeight = mvtext.getBoundingClientRect().height;
    mvtext.style.transform = `translateY(${mvtextHeight}px)`;

    const handleScroll = () => {
      const mvBounds = mv.getBoundingClientRect();
      if (mvBounds.top < 0) {
        const translateY = Math.abs(mvBounds.top) * 0.5;
        mvWrapper.style.transform = `translateY(${translateY}px)`;
        if( mvtextHeight - translateY > 0) {
          mvtext.style.transform = `translateY(${mvtextHeight - translateY }px)`;
        } else {
          mvtext.style.transform = `translateY(0)`;
        }
      } else {
        mvWrapper.style.transform = 'translateY(0)';
        mvtext.style.transform = `translateY(${mvtextHeight}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
  }

  /**
   * Initialize pen scroll animation with proper viewport detection
   */
  private initPenScrollAnimation = () => {
    const penSection = document.querySelector('.b-vision__ill');
    const penTip = document.querySelector('.b-vision__ill__item01') as HTMLElement;
    // const penCap = document.querySelector('.b-vision__ill__item02') as HTMLElement;
    if (!penSection || !penTip ) return;

    let isInView = false;

    const handleScroll = () => {
      const rect = penSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Check if pen section is in viewport
      const isVisible = rect.top < windowHeight;
      if (isVisible && !isInView) {
        // First time entering viewport - reset positions
        isInView = true;
      } else if (!isVisible && isInView) {
        // Left viewport
        isInView = false;
      }
      if (isVisible) {
        // Calculate scroll progress within the section
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const viewportProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));
        // Apply progressive animation based on scroll
        const tipX = -150 + (150 * viewportProgress * 1.8);
        const tipY = 150 - (150 * viewportProgress * 1.8);
        // const capX = 60 - (60 * viewportProgress * 2);
        // const capY = -60 + (60 * viewportProgress * 2);
        if((150 * viewportProgress * 1.8) > 150) {
          penTip.style.transform = 'translate3d(0, 0, 0)';
        } else {
          penTip.style.transform = `translate3d(${tipX}px, ${tipY}px, 0)`;

        }
        // penCap.style.transform = `translate3d(${capX}px, ${capY}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
  }

  /**
   * Initialize Parallax animation
   */
  private initParallaxChange = () => {
    // Destroy existing parallax if it exists
    if (this.changeSection) {
      this.changeSection.destroy();
      this.changeSection = null;
      this.mvSection.destroy();
      this.mvSection = null;
    }
    // Only create new parallax if window width >= 1000
    if (window.innerWidth >= 1000) {
      const change = document.getElementById('change');
      if (change) {
        this.changeSection = new Parallax(change, {
          selector: '.layer',
          pointerEvents: true,
          relativeInput: true,
          hoverOnly: true,
          frictionX: .02,
          frictionY: .02,
        });
      }
    }
    if( window.innerWidth >750) {
      const scene = document.getElementById('scene');
      if(scene) {
        this.mvSection = new Parallax(scene, {
          selector: '.layer',
          pointerEvents: true,
          relativeInput: true,
          hoverOnly: true,
          frictionX: .01,
          frictionY: .01
        });
      }
    }
  }

   
   private handleParallaxChange = () => {
     // Only apply custom scroll animation if window width < 1000
    if (window.innerWidth < 1000) {

      console.log(true);
      
      const mv = document.querySelector('.b-change');
      const mvWrapper = document.querySelector('.b-change .section__inner') as HTMLElement;

      if (!mv || !mvWrapper) return;

      const handleScroll = () => {
        const rect = mv.getBoundingClientRect();
        const wrapperRect = mvWrapper.getBoundingClientRect();
        const sectionHeight = rect.height;
        const triggerY = rect.top + sectionHeight / 2; // section half height from viewport top
        const viewportBottom = window.innerHeight;     // viewport bottom from viewport top

        // Before trigger: keep wrapper pushed below (quarter height offset)
        if (viewportBottom <= triggerY) {
          mvWrapper.style.transform = `translateY(${wrapperRect.height / 4}px)`;
          return;
        }
        // After trigger: move up with -scroll * 0.5, but clamp by section height
        const clampedDelta = Math.max(0, viewportBottom - triggerY);
        const translate = (wrapperRect.height / 4) - clampedDelta * 0.5; // negative as you scroll down
        mvWrapper.style.transform = `translateY(${translate}px)`;
      };

      // Remove existing scroll listener to prevent duplicates
      if (this.mobileChangeScrollHandler) {
        window.removeEventListener('scroll', this.mobileChangeScrollHandler);
      }
      this.mobileChangeScrollHandler = handleScroll;
      window.addEventListener('scroll', this.mobileChangeScrollHandler);
    } else {
      // Reset transform when switching to desktop
      const mvWrapper = document.querySelector('.b-change .section__inner') as HTMLElement;
      if (mvWrapper) {
        // mvWrapper.style.transform = 'translateY(0)';
        mvWrapper.removeAttribute('style');
      }
      // Remove mobile scroll handler on desktop
      if (this.mobileChangeScrollHandler) {
        window.removeEventListener('scroll', this.mobileChangeScrollHandler);
        this.mobileChangeScrollHandler = undefined;
      }
    }
  }
}