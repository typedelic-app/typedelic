const fs = require('fs-extra');
import store from '../../storage/storage';
import getExistTags from '../tag/getExistTags';
import {
  resetEditor,
  getFileName,
  getNameWithoutExtention,
  getTodayString,
  getRandom,
} from '../utils';
import { AppState } from '../../types';
import { Dispatch } from 'react';
const { dialog } = require('electron').remote;
import api from '..';

export async function removePermanently(
  path: string,
  state: AppState,
  dispatch: Dispatch<any>
) {
  const message = await dialog.showMessageBox({
    type: 'question',
    message: `Do you want to delete this file permanently? You can't undo this action.`,
    buttons: ['Delete', 'Cancel'],
  });
  if (message.response === 0) {
    await fs.removeSync(path);
    if (state.editor.path === path) {
      dispatch({
        type: 'SET_EDITOR',
        title: '',
        path: '',
        markdown: '',
        tags: [],
      });
    }
  }
}

export default async function removeFile(
  path: string,
  state: AppState,
  dispatch: Dispatch<any>
) {
  const trashbox = store.get('workspace.trashboxPath');
  const fileName = getNameWithoutExtention(getFileName(path));
  const trashedDate = getTodayString();
  const random = getRandom();
  const trashPath = `${trashbox}/${fileName}_${trashedDate}${random}.md`;
  await fs.renameSync(path, trashPath);
  const tags = getExistTags(state.workspace.tags);
  store.set('tags', tags);
  dispatch({
    type: 'SET_TAGS',
    tags,
  });
  if (state.editor.path === path) {
    resetEditor(dispatch);
  }
  api.reloadNotes(state, dispatch);
}
