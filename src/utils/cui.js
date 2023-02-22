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

export {
  removeEmpty,
  groupBy,
  sortBy,
  toCapitalizeCase,
  parseStringObject,
}
