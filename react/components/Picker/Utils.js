// Easing Equations (c) 2003 Robert Penner, all rights reserved.
// Open source under the BSD License.
export function easeOutCubic(pos) {
  return (Math.pow((pos - 1), 3) + 1);
}

export function easeInOutCubic(p) {
  let pos = p;
  pos /= 0.5;
  if (pos < 1) {
    return 0.5 * Math.pow(pos, 3);
  }
  return 0.5 * (Math.pow((pos - 2), 3) + 2);
}

export function getElementStyle(elem, styleKey) {
  if (elem.style[styleKey]) {
    return elem.style[styleKey];
  }

  if (elem.currentStyle && elem.currentStyle[styleKey]) {
    return elem.currentStyle[styleKey];
  }

  if (document.defaultView && document.defaultView.getComputedStyle) {
    styleKey = styleKey.replace(/([A-Z])/g, '-$1').toLowerCase();
    return document.defaultView.getComputedStyle(elem, null).getPropertyValue(styleKey);
  }

  return null;
}
