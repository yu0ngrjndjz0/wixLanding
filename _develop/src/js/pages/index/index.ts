import Parallax from 'parallax-js';
import {onScroll, stagger, animate} from 'animejs';

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

    animate('.mv__item__text', {
      clipPath: ['inset(0 0 100%)', 'inset(0 0 0%)'],
      duration: 1000,
      delay: stagger(200),
      easing: 'easeInOutQuad',
      autoplay: onScroll({ sync: true })
    });

    // animate('.mv__wrapper', {
    //   translateY: ['0px', '100px'], // Điều chỉnh khoảng cách parallax ở đây
    //   duration: 2000,
    //   easing: 'easeInOutQuad',
    //   autoplay: onScroll({
    //     sync: true,
        
    //   })
    // });
    

    
    this.parallaxMV();
    this.stickySection();
  }

  private parallaxMV = () => {
    const mv = document.querySelector('.mv');
    const mvWrapper = document.querySelector('.mv__wrapper') as HTMLElement;

    if (!mv || !mvWrapper) return;

    const handleScroll = () => {
      const mvBounds = mv.getBoundingClientRect();
      if (mvBounds.top < 0) {
        const translateY = Math.abs(mvBounds.top) * 0.5;
        mvWrapper.style.transform = `translateY(${translateY}px)`;
      } else {
        mvWrapper.style.transform = 'translateY(0)';
      }
    };

    window.addEventListener('scroll', handleScroll);
  }

  private stickySection = () => {
    // Handle sticky section
    const sec1 = document.querySelector('.section.-sec01');
    const secSub = document.querySelectorAll('.section__sub');
    const sec2 = document.querySelector('.section.-sec02');
    // if (sections.length >= 2) {
      const secondSection = secSub[1];
      
      // animate(secondSection, {
      //   translateY: ['0%', '100%'],  // Start and end at same position
      //   duration: 1000,
      //   delay: stagger(200),
      //   easing: 'easeInOutQuad',
      //   autoplay: onScroll({ sync: true })  // We'll control this with scroll
      // });

      // Add sticky class when element comes into view
      if (!sec1 || !sec2 || !secondSection) return;
      // Lấy vị trí top của section
      // const sec1Bounds = sec1.getBoundingClientRect();
      // const topValue = sec1Bounds.top;

      // // Gán giá trị top negative cho section khi sticky
      // (sec1 as HTMLElement).style.setProperty('--sticky-top', `${-topValue}px`);

      // const observer = new IntersectionObserver((entries) => {
      //   entries.forEach(entry => {
      //     if (entry.isIntersecting) {
      //       sec1?.classList.add('-sticky');
      //       // Cập nhật lại top mỗi khi intersection thay đổi
      //       // const newBounds = sec1.getBoundingClientRect();
      //       // (sec1 as HTMLElement).style.setProperty('--sticky-top', `${-newBounds.top}px`);
      //     } else {
      //       sec1?.classList.remove('-sticky');
      //     }
      //   });
      // }, {
      //   threshold: 0.1  // Trigger when 10% of element is visible
      // });

      // observer.observe(sec2);
  }
}