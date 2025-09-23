const addClass = (el: HTMLElement, className: string) => {
  el.classList.add(className);
};

const removeClass = (el: HTMLElement, className: string) => {
  el.classList.remove(className);
};

const selector = (el: string) => {
  return document.querySelector(el) as HTMLElement;
};

const selectorAll = (el: string) => {
  return Array.prototype.slice.call(document.querySelectorAll(el));
};

export { addClass, removeClass, selector, selectorAll };
