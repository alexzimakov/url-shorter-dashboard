import moment from 'moment';
import 'moment/locale/ru';

function date(value, format = 'MM.DD.YYYY', relative = false) {
  const d = new Date(value);

  if (relative) {
    return moment(d, format).fromNow();
  }

  return moment(d).format(format);
}


export default date;
