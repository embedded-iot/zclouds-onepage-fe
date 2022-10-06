import moment from 'moment';

function convert(datetime, formatStr) {
  if (!datetime || !formatStr)
    return '';
  return moment(datetime).format(formatStr);
}

export {
  convert
}
