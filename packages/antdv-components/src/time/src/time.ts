import { format } from 'date-fns';
import { format as relative, type TDate } from 'timeago.js';

const DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';
const DATE_FORMAT = 'yyyy-MM-dd';

/** 格式化时间为：yyyy-MM-dd HH:mm:ss */
export function formatToDateTime(date: number | Date | string, formatStr = DATE_TIME_FORMAT): string {
  return format(new Date(date), formatStr);
}

/** 格式化时间为：yyyy-MM-dd */
export function formatToDate(date: number | Date | string, formatStr = DATE_FORMAT): string {
  return format(new Date(date), formatStr);
}

/** 获取相对时间 */
export function relativeTime(time: TDate) {
  return relative(time, 'zh_CN');
}
