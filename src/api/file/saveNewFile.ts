const fs = require('fs-extra');
import { isExistFile, getTodayString } from '../utils';
import addTag from '../tag/addTag';
import getNotes from '../workspace/getNotes';

export default function saveNewFile(
  markdown: string,
  title: string,
  state: any,
  dispatch: any
) {
  const { workspace, note, editor } = state;

  const path = `${workspace.defaultFolder}/${title}.md`;
  if (title !== '' && !isExistFile(path)) {
    fs.writeFileSync(path, markdown);
    editor.tags.map((e: string) => {
      addTag(e, path, state, dispatch);
    });
  } else {
    const date = getTodayString();
    const tempPath = `${workspace.defaultFolder}/untitled-${date}.md`;
    if (!isExistFile(tempPath)) {
      fs.writeFileSync(tempPath, markdown);
      editor.tags.map((e: string) => {
        addTag(e, tempPath, state, dispatch);
      });
    }
  }
  if (note.selectedFolder.path === workspace.defaultFolder) {
    const data = getNotes(workspace.defaultFolder);
    data.then((files: any) => {
      dispatch({
        type: 'SET_NOTE_LIST',
        list: files,
      });
    });
  }
}
