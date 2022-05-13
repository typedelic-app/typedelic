const fs = require('fs-extra');
import store from '../../storage/storage';
import getRenamedTags from '../tag/getRenamedTags';
import { isExistFile } from '../utils';
import { AppState } from '../../types';
import { Dispatch } from 'react';
import api from '..';

export default async function moveFile(
  oldPath: string,
  newPath: string,
  state: AppState,
  dispatch: Dispatch<any>
) {
  dispatch({
    type: 'SET_DRAG_ITEM',
    dragItem: { name: '', path: '', type: 'file' },
  });
  const newFullPath = `${newPath}.md`;
  if (oldPath === newFullPath) return;
  if (isExistFile(newFullPath)) {
    alert('A file with the same name already exists');
    return;
  }
  await fs.renameSync(oldPath, newFullPath);
  // editor //
  if (state.editor.path === oldPath) {
    dispatch({
      type: 'SET_EDITOR_PATH',
      path: newFullPath,
    });
  }
  // tags //
  getRenamedTags(oldPath, newFullPath, store.get('tags'), 'file').then(
    (tags: any) => {
      store.set('tags', tags);
      dispatch({
        type: 'SET_TAGS',
        tags,
      });
    }
  );
  // reload //
  api.reloadNotes(state, dispatch);
}
