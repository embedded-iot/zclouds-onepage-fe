const removeEmpty = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') {
      removeEmpty(obj[key]);
    } else if (obj[key] === '') {
      delete obj[key];
    }
  });
  return obj;
};

/**
 * @description
 * Takes an Array<V>, and a grouping function,
 * and returns a Map of the array grouped by the grouping function.
 *
 * @param list An array of type V.
 * @param keyGetter A Function that takes the the Array type V as an input, and returns a value of type K.
 *                  K is generally intended to be a property key of V.
 *
 * @returns Map of the array grouped by the grouping function.
 */
//export function groupBy<K, V>(list: Array<V>, keyGetter: (input: V) => K): Map<K, Array<V>> {
//    const map = new Map<K, Array<V>>();
function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

function sortBy(list, sortByKey, sortOrder = true) {
  return list.sort((p1, p2) => {
    if (sortOrder) {
      return (p1[sortByKey] > p2[sortByKey]) ? 1 : (p1[sortByKey] < p2[sortByKey]) ? -1 : 0;
    }
    return (p1[sortByKey] < p2[sortByKey]) ? 1 : (p1[sortByKey] > p2[sortByKey]) ? -1 : 0;
  });
}

const toCapitalizeCase = (str, isFirstOnly = false) => {
  if (isFirstOnly) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  const arr = str.split(" ");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
  }
  return arr.join(' ');
}
const parseStringObject = (str, defaultValue = {}) => {
  try {
    const shippingEventList = JSON.parse(str);
    return typeof shippingEventList === 'object' ? shippingEventList  : defaultValue;
  } catch (error) {
    return defaultValue;
  }
}

function RGBAToHexA(r, g, b, a) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);
  a = Math.round(a * 255).toString(16);

  if (r.length === 1)
    r = "0" + r;
  if (g.length === 1)
    g = "0" + g;
  if (b.length === 1)
    b = "0" + b;
  if (a.length === 1)
    a = "0" + a;

  return "#" + r + g + b + a;
}

function hexAToRGBA(h) {
  let r = 0, g = 0, b = 0, a = 1;

  if (h.length === 5) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];
    a = "0x" + h[4] + h[4];

  } else if (h.length === 9) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
    a = "0x" + h[7] + h[8];
  }
  a = +(a / 255).toFixed(3);

  return {
    r: +r,
    g: +g,
    b: +b,
    a: +a,
  }
}

// input:
// [
//   ['a', 'b', 'c'],
//   ['1', '2'],
//   ['w', 'x', 'y', 'z']
// ]
//
// output:
// a 1 w
// a 1 x
// a 1 y

function detectCombinations(input, output, position, path) {
  if (position == null) {
    position = 0;
  }
  if (path == null) {
    path = [];
  }
  if (position < input.length) {
    var item = input[position];
    for (var i = 0; i < item.length; ++i) {
      var value = item[i];
      path.push(value);
      detectCombinations(input, output, position + 1, path);
      path.pop();
    }
  } else {
    output.push(path.slice());
  }
};

export {
  removeEmpty,
  groupBy,
  sortBy,
  toCapitalizeCase,
  parseStringObject,
  RGBAToHexA,
  hexAToRGBA,
  detectCombinations,
}
