export function pxToVw(pxValue) {
  const vwValue = (pxValue / document.documentElement.clientWidth) * 100;
  return vwValue;
}
