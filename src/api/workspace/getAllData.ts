const fs = require('fs-extra');
import store from '../../storage/storage';
import { getDirectoryName, getDate, getNameWithoutExtention } from '../utils';
import * as Comlink from 'comlink';
// @ts-ignore
import MyWorker from '../../workers/main.worker';
import sortNotes from './sortNotes';
const worker = new MyWorker();
const comlinked: any = Comlink.wrap(worker);

async function getRecursionFiles(
  dir: string,
  baseDir = dir,
  homeDir = dir,
  counter = 0
): Promise<any> {
  const allFiles: any[] = [];
  const paths = fs.readdirSync(dir);
  for (let i = 0; i < paths.length; i += 1) {
    const name = paths[i];
    const extention = name.split('.').pop().toLowerCase();
    const nameToShow = getNameWithoutExtention(name);
    const path = `${dir}/${name}`;
    const stat = fs.statSync(path);
    if ((extention !== 'md' && stat.isFile()) || name.indexOf('.') === 0) {
      continue;
    }
    const parent = dir.replace(homeDir, '');
    const date = getDate(stat.mtime);
    switch (true) {
      case stat.isFile():
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
        break;
      case stat.isDirectory():
        allFiles.push({
          name,
          fullPath: path,
          parent,
          leaf: false,
          children: [],
        });
        allFiles.push(
          ...(await getRecursionFiles(path, baseDir, dir, counter + 1))
        );
        break;
      default:
    }
  }
  return allFiles;
}

export default async function getAllFiles(dir: string) {
  const allFiles = await getRecursionFiles(dir);
  const files: any[] = [];
  const folders: any[] = [];
  for (let i = 0; i < allFiles.length; i += 1) {
    if (!allFiles[i].leaf) {
      folders.push(allFiles[i]);
    } else {
      files.push(allFiles[i]);
    }
  }

  for (let i = 0; i < folders.length; i++) {
    if (folders[i].parent !== '') {
      const folderDirectory = getDirectoryName(folders[i].fullPath);
      for (const ff of folders) {
        if (folderDirectory === ff.fullPath) {
          ff.children.push(folders[i]);
        }
      }
    }
  }
  const res = folders.filter((f) => {
    return f.parent === '';
  });
  const sorted = await sortNotes(files, store.get('workspace.sortMode'));
  return {
    files: sorted,
    folders: res,
  };
}
