const fs = require('fs-extra');
import { isExistFile } from '../utils';

const readFile = (path: string): string => {
  if (path === '' || !isExistFile(path)) return '';
  const markdown = fs.readFileSync(path);
  return markdown.toString();
};

export default readFile;
