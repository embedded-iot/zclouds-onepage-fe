
function formatCurrency(num = 0, unit = "đ", isFloat = false) {
  var p = num.toFixed(2).split(".");
  return p[0].split("").reverse().reduce(function(acc, num, i, orig) {
    return num + (num !== "-" && i && !(i % 3) ? "," : "") + acc;
  }, "") + (isFloat  ? `.${p[1]}` : '') + ` ${unit}`;
}

export {
  formatCurrency
}
