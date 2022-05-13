const fs = require('fs-extra');
const { app } = require('electron');
import { isExistFile } from './utils';
import { note } from '../markdown/note';

export function initializeStore(store: any) {
  const path = `${app.getPath('userData')}/typedelic`;
  const defaultFolder = `${path}/Default`;
  const defaultNote = `${path}/Default/Welcome to Typedelic.md`;
  const trashboxPath = `${app.getPath('userData')}/Trashbox`;
  if (!isExistFile(path)) {
    fs.mkdir(path, { recursive: true }, (error: any) => {
      if (error) throw error;
    });
  }
  if (!isExistFile(defaultFolder)) {
    fs.mkdir(defaultFolder, { recursive: true }, (error: any) => {
      if (error) throw error;
    });
  }
  if (!isExistFile(trashboxPath)) {
    fs.mkdir(trashboxPath, { recursive: true }, (error: any) => {
      if (error) throw error;
    });
  }
  if (!isExistFile(defaultNote) && !store.get('workspace.isNotFirstRender')) {
    fs.writeFileSync(defaultNote, note);
  }
  // init //
  if (store.get('view.color') === undefined) {
    store.set('view.color', 'meditation');
  }
  if (store.get('view.viewMode') === undefined) {
    store.set('view.viewMode', 'split');
  }
  if (store.get('workspace.path') === undefined) {
    store.set('workspace.path', path);
  }
  if (store.get('workspace.defaultFolder') === undefined) {
    store.set('workspace.defaultFolder', defaultFolder);
  }
  if (store.get('workspace.defaultNote') === undefined) {
    store.set('workspace.defaultNote', defaultNote);
  }
  if (store.get('workspace.trashboxPath') === undefined) {
    store.set('workspace.trashboxPath', trashboxPath);
  }
  if (store.get('workspace.sortMode') === undefined) {
    store.set('workspace.sortMode', 'name');
  }
  if (store.get('tags') === undefined) {
    store.set('tags', []);
  }
  if (store.get('workspace.isFirstRender') === undefined) {
    store.set('workspace.isNotFirstRender', true);
  }
}
