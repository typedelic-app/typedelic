const fs = require('fs-extra');
import store from '../../storage/storage';
import sortNotes from './sortNotes';
import {
  getDirectoryName,
  isExistFile,
  getDate,
  getNameWithoutExtention,
  getFileName,
} from '../utils';
import * as Comlink from 'comlink';
// @ts-ignore
import MyWorker from '../../workers/main.worker';
const worker = new MyWorker();
const comlinked: any = Comlink.wrap(worker);

export default async function getFiles(paths: string[]) {
  const allFiles: any[] = [];
  for (let i = 0; i < paths.length; i += 1) {
    const name = getFileName(paths[i]) || '';
    if (isExistFile(paths[i]) && name.indexOf('.') !== 0) {
      const nameToShow = getNameWithoutExtention(name);
      const path = paths[i];
      const stat = fs.statSync(path);
      if (stat.isFile()) {
        const parent = getDirectoryName(path);
        const date = getDate(stat.mtime);
        const raw = fs.readFileSync(path).toString();
        await comlinked.task.count(raw);
        const taskList = await comlinked.task.list;
        allFiles.push({
          name: nameToShow,
          fullPath: path,
          date,
          excerpt: raw,
          tags: [],
          parent,
          leaf: true,
          tasks: taskList,
        });
      }
    }
  }
  const res = await sortNotes(allFiles, store.get('workspace.sortMode'));
  return res;
}
