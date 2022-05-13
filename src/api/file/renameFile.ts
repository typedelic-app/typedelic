const fs = require('fs-extra');
import store from '../../storage/storage';
import getRenamedTags from '../tag/getRenamedTags';
import { getDirectoryName, isExistFile } from '../utils';
import { AppState } from '../../types';
import { Dispatch } from 'react';

export default async function renameFile(
  path: string,
  name: string,
  state: AppState,
  dispatch: Dispatch<any>
) {
  if (name === '' || name === ' ') return;
  const dir = getDirectoryName(path);
  const newPath = `${dir}/${name}.md`;
  if (!isExistFile(newPath)) {
    await fs.renameSync(path, newPath);
    const tags = await getRenamedTags(
      path,
      newPath,
      state.workspace.tags,
      'file'
    );
    await store.set('tags', tags);
    await dispatch({
      type: 'SET_TAGS',
      tags,
    });
    dispatch({
      type: 'SET_EDITOR_TITLE',
      title: name,
    });
    dispatch({
      type: 'SET_EDITOR_PATH',
      path: newPath,
    });
  } else {
    return false;
  }
}
