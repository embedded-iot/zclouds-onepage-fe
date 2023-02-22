
function formatCurrency(number = 0, unit = "$", isFloat = false) {
  const num = Math.abs(number);
  var p = num.toFixed(2).split(".");
  return `${number < 0 ? '-' : ''}` + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
    return num + (num !== "-" && i && !(i % 3) ? "," : "") + acc;
  }, "") + (isFloat  ? `.${p[1]}` : '') + ` ${unit}`;
}

export {
  formatCurrency
}
