const fs = require('fs-extra');
import { getFileName } from '../utils';
import { AppState } from '../../types';
import { Dispatch } from 'react';

export default async function createFile(
  dir: string,
  state: AppState,
  dispatch: Dispatch<any>
) {
  let i = 1;
  let targetDir =
    dir === '' || dir === undefined ? state.workspace.defaultFolder : dir;
  async function write(p: string) {
    await fs.writeFileSync(p, '');
    const name = getFileName(p)?.split('.');
    name?.pop();
    dispatch({
      type: 'SET_EDITOR',
      path: p,
      title: name,
      tags: [],
      markdown: '',
    });
  }
  function check() {
    const name = `untitled-${i}.md`;
    const path = `${targetDir}/${name}`;
    fs.readFile(path, (error: any) => {
      if (error) {
        write(path);
      } else {
        i += 1;
        check();
      }
    });
  }
  check();
}
