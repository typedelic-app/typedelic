const fs = require('fs-extra');
import store from '../../storage/storage';
import { isExistFile, getDirectoryName, getFileName } from '../utils';
import getAllData from '../workspace/getAllData';
import getRenamedTags from '../tag/getRenamedTags';
import { AppState } from '../../types';
import { Dispatch } from 'react';

export default async function renameFolder(
  path: string,
  name: string,
  state: AppState,
  dispatch: Dispatch<any>
) {
  if (name === '' || name === ' ') return;
  const { workspace, editor, note } = state;
  const parentDir = getDirectoryName(path);
  const newPath = `${parentDir}/${name}`;
  if (isExistFile(newPath) || !isExistFile(path)) return;
  await fs.renameSync(path, newPath);
  const data = getAllData(workspace.path);
  data.then((e: any) => {
    dispatch({
      type: 'SET_ALL_FOLDERS',
      allFolders: e.folders,
    });
  });
  // tags //
  const tags = await getRenamedTags(path, newPath, workspace.tags, 'folder');
  await store.set('tags', tags);
  dispatch({
    type: 'SET_TAGS',
    tags,
  });
  // selected //
  if (note.selectedFolder.path === path) {
    dispatch({
      type: 'SET_SELECTED_FOLDER',
      selectedFolder: { name: name, path: newPath },
    });
    dispatch({
      type: 'SET_NOTE_TITLE',
      title: name,
    });
  }
  // editor //
  const editorStr = editor.path.substr(0, path.length);
  if (editorStr === path) {
    const newEditorPath = editor.path.replace(path, newPath);
    dispatch({
      type: 'SET_EDITOR_PATH',
      path: newEditorPath,
    });
  }
}
