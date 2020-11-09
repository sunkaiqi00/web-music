export function addClass(el, className) {
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

export function attribute(el, name, val) {
  let prefix = 'data-';
  name = prefix + name;
  if (val) {
    return el.setAttribute(name, val);
  } else {
    return el.getAttribute(name);
  }
}
