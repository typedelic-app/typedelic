import fs from 'fs-extra';
import store from '../../storage/storage';
const { dialog } = require('electron').remote;
import { Dispatch } from 'react';
import { AppState } from '../../types';
import api from '..';

async function emptyTrash(state: AppState, dispatch: Dispatch<any>) {
  const message = await dialog.showMessageBox({
    type: 'question',
    message: `Do you want to delete all files in trash ? You can't undo this action.`,
    buttons: ['Delete', 'Cancel'],
  });
  if (message.response === 0) {
    const trashboxPath: string = store.get('workspace.trashboxPath');
    await fs.readdir(trashboxPath, async function (err, files) {
      if (err) {
        throw err;
      }
      await files.forEach(async function (file) {
        const path = `${trashboxPath}/${file}`;
        await fs.removeSync(path);
      });
      api.reloadNotes(state, dispatch);
    });
  }
}

export default emptyTrash;
