import moment from 'moment';

function convert(datetime, formatStr) {
  if (!datetime || !formatStr)
    return '';
  return moment(datetime).format(formatStr);
}

function getPreviousDay(date = new Date(), count = 1) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - count);
  return previous;
}

export {
  convert,
  getPreviousDay,
}
