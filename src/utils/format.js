
function formatCurrency(num = 0, unit = "$", isFloat = false) {
  var p = num.toFixed(2).split(".");
  return `${unit}` + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
    return num + (num !== "-" && i && !(i % 3) ? "," : "") + acc;
  }, "") + (isFloat  ? `.${p[1]}` : '');
}

export {
  formatCurrency
}
