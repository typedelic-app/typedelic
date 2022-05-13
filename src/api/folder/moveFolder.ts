const fs = require('fs-extra');
import store from '../../storage/storage';
import getAllData from '../workspace/getAllData';
import getRenamedTags from '../tag/getRenamedTags';
import { isExistFile } from '../utils';
import { AppState } from '../../types';
import { Dispatch } from 'react';

export default async function moveFolder(
  oldPath: string,
  newPath: string,
  state: AppState,
  dispatch: Dispatch<any>
) {
  if (oldPath === newPath) return;
  const { workspace, note, editor } = state;
  if (isExistFile(newPath)) {
    alert('A folder with the same name already exists');
  }
  if (!isExistFile(newPath)) {
    await fs.renameSync(oldPath, newPath);
    const data = getAllData(workspace.path);
    data.then((e: any) => {
      dispatch({
        type: 'SET_ALL_FOLDERS',
        allFolders: e.folders,
      });
    });
    // notes //
    if (note.selectedFolder.path === oldPath) {
      await dispatch({
        type: 'SET_SELECTED_FOLDER',
        title: note.selectedFolder.name,
        selectedFolder: {
          name: note.selectedFolder.name,
          path: newPath,
        },
      });
    }
    // editor //
    const editorStr = editor.path.substr(0, oldPath.length);
    if (editorStr === oldPath) {
      const newEditorPath = editor.path.replace(oldPath, newPath);
      await dispatch({
        type: 'SET_EDITOR_PATH',
        path: newEditorPath,
      });
    }
    // tags //
    const tags = await getRenamedTags(
      oldPath,
      newPath,
      state.workspace.tags,
      'folder'
    );
    store.set('tags', tags);
    await dispatch({
      type: 'SET_TAGS',
      tags,
    });
  }
  // drag item //
  dispatch({
    type: 'SET_DRAG_ITEM',
    dragItem: { name: '', path: '', type: 'file' },
  });
}
