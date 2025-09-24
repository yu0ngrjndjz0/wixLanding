import Parallax from 'parallax-js';
import {animate} from 'animejs';

export default class Index {
  /**
   * Creates an instance of Index.
   */
  constructor() {
    const scene = document.getElementById('scene');
    new Parallax(scene, {
      selector: '.layer',
      pointerEvents: true,
      relativeInput: true,
      hoverOnly: true,
      frictionX: .01,
      frictionY: .01
    });

   

    // animate('.square', {
    //   x: '15rem',
    //   rotate: '1turn',
    //   duration: 2000,
    //   alternate: true,
    //   loop: true,
    //   ease: 'inOutQuad',
    // });
    // createTimeline()
    // .add('.mv__item__text ', {
    //   y: '-=6',
    //   duration: 50,
    // }, stagger(10))
    // .add('.ticker', {
    //   rotate: 360,
    //   duration: 1920,
    // }, '&lt;');


    // animate('.mv__item__text', {
    //   // clipPath: ['inset(0 0 100%)', 'inset(0 0 0%)'],
    //   translateY: ['20px', '-100px'],
    //   duration: 1000,
    //   delay: stagger(100),
    //   easing: 'easeInOut',
    //   autoplay: onScroll({ sync: true })
    // });
    // animate('.mv__wrapper', {
    //   translateY: ['0px', '100px'], // Điều chỉnh khoảng cách parallax ở đây
    //   duration: 2000,
    //   easing: 'easeInOutQuad',
    //   autoplay: onScroll({
    //     sync: true,
    //   })
    // });

    this.parallaxMV();
    // this.stickySection();
    this.initPenScrollAnimation();
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
        // if( translateY <= 100) {
        // } else {
        //   mvtext.style.transform = `translateY(100px)`;
        // }
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
    
    if (!penSection || !penTip) return;

    let isInView = false;

    const handleScroll = () => {
      const rect = penSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if pen section is in viewport
      const isVisible = rect.top < windowHeight && rect.bottom > 0;
      
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
        const tipX = -120 + (120 * viewportProgress * 2);
        const tipY = 120 - (120 * viewportProgress * 2);
        // const capX = 60 - (60 * viewportProgress * 2);
        // const capY = -60 + (60 * viewportProgress * 2);
        if((120 * viewportProgress * 2) > 120) {
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
   * Initialize clipped element animation - Text Color Reveal Effect
   */
  

  // private stickySection = () => {
  //   // Handle sticky section
  //   const sec1 = document.querySelector('.section.-sec01');
  //   const secSub = document.querySelectorAll('.section__sub');
  //   const sec2 = document.querySelector('.section.-sec02');
  //   // if (sections.length >= 2) {
  //     const secondSection = secSub[1];
  //     // animate(secondSection, {
  //     //   translateY: ['0%', '100%'],  // Start and end at same position
  //     //   duration: 1000,
  //     //   delay: stagger(200),
  //     //   easing: 'easeInOutQuad',
  //     //   autoplay: onScroll({ sync: true })  // We'll control this with scroll
  //     // });

  //     // Add sticky class when element comes into view
  //     if (!sec1 || !sec2 || !secondSection) return;
  //     // Lấy vị trí top của section
  //     // const sec1Bounds = sec1.getBoundingClientRect();
  //     // const topValue = sec1Bounds.top;

  //     // // Gán giá trị top negative cho section khi sticky
  //     // (sec1 as HTMLElement).style.setProperty('--sticky-top', `${-topValue}px`);

  //     // const observer = new IntersectionObserver((entries) => {
  //     //   entries.forEach(entry => {
  //     //     if (entry.isIntersecting) {
  //     //       sec1?.classList.add('-sticky');
  //     //       // Cập nhật lại top mỗi khi intersection thay đổi
  //     //       // const newBounds = sec1.getBoundingClientRect();
  //     //       // (sec1 as HTMLElement).style.setProperty('--sticky-top', `${-newBounds.top}px`);
  //     //     } else {
  //     //       sec1?.classList.remove('-sticky');
  //     //     }
  //     //   });
  //     // }, {
  //     //   threshold: 0.1  // Trigger when 10% of element is visible
  //     // });

  //     // observer.observe(sec2);
  // }
}