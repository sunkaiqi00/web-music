export function addClass(el, className) {
  // console.log(el.className);
  if (!hasClass(el, className)) {
    let classList = el.className.split(' ');
    classList.push(className);
    el.className = classList.join(' ');
  }
}

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
}
