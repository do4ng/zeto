import { compile } from './compile';
import { ZetoFragment } from './dom';

export function html(...arr: any[]): ZetoFragment {
  const strings = arr[0];
  const values = arr.slice(1);

  const stats = {
    html: '',
    data: [],
  };

  for (const [index, str] of strings.entries()) {
    // eslint-disable-next-line no-unused-expressions
    stats.html += str;
    if (values[index]) {
      stats.data.push(values[index]);
      stats.html += `$${index}$` || '';
    }
  }

  return compile(stats.html, stats.data);
}
