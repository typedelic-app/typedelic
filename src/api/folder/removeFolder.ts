const fs = require('fs-extra');
import store from '../../storage/storage';
const { dialog } = require('electron').remote;
import {
  getFileName,
  resetEditor,
  getNameWithoutExtention,
  getTodayString,
  getRandom,
} from '../utils';
import getAllData from '../workspace/getAllData';
import getExistTags from '../tag/getExistTags';
import { AppState } from '../../types';

export default async function removeFolder(
  path: string,
  state: AppState,
  dispatch: any
) {
  const { note, editor, workspace } = state;
  const name = getFileName(path);
  const message = await dialog.showMessageBox({
    type: 'question',
    message: `Do you want to delete ${name} ? You can't undo this action.`,
    buttons: ['Delete', 'Cancel'],
  });
  if (message.response === 0) {
    const trashbox = store.get('workspace.trashboxPath');
    const data = await getAllData(path);
    const files = data.files;
    if (files.length !== 0) {
      for (let i = 0; i < files.length; i++) {
        const fileName = getNameWithoutExtention(
          getFileName(files[i].fullPath)
        );
        const trashedDate = getTodayString();
        const rand = getRandom();
        const trashPath = `${trashbox}/${fileName}_${trashedDate}${rand}.md`;
        await fs.renameSync(files[i].fullPath, trashPath);
      }
    }
    await fs.removeSync(path);
    // selected //
    const str = note.selectedFolder.path.substr(0, path.length);
    if (str === path) {
      dispatch({
        type: 'RESET_SELECTED',
      });
    }
    // editor //
    if (editor.path.substr(0, path.length) === path) {
      resetEditor(dispatch);
    }
    // tags //
    const tags = getExistTags(workspace.tags);
    dispatch({
      type: 'SET_TAGS',
      tags,
    });
    store.set('tags', tags);
    // folders //
    const allData = await getAllData(workspace.path);
    dispatch({
      type: 'SET_ALL_FOLDERS',
      allFolders: allData.folders,
    });
  }
}
