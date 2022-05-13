const fs = require('fs-extra');
import { isExistFile } from '../utils';

export default function saveFile(path: string, markdown: string): void {
  if (path !== '' && isExistFile(path)) {
    fs.writeFileSync(path, markdown);
  }
}
