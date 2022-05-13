import store from '../../storage/storage';
import { AppState } from '../../types';

async function removeTag(
  oldName: string,
  newName: string,
  state: AppState,
  dispatch: any
) {
  const { editor, note } = state;
  const tags = store.get('tags');
  const isExist = tags.some((tag: any) => {
    return tag.name === newName;
  });
  if (isExist || newName === oldName) return;
  const newTags = await tags.map((tag: any) => {
    if (tag.name === oldName) return { name: newName, paths: tag.paths };
    else return tag;
  });
  await store.set('tags', newTags);
  await dispatch({
    type: 'SET_TAGS',
    tags: newTags,
  });
  if (note.selectedTag.name === oldName) {
    dispatch({
      type: 'SET_SELECTED_TAG',
      selectedTag: { name: newName, paths: note.selectedTag.paths },
    });
    dispatch({
      type: 'SET_NOTE_TITLE',
      title: newName,
    });
  }
  if (editor.tags.length !== 0) {
    const newEditorTags = editor.tags.map((tag: string) => {
      if (tag === oldName) return newName;
      else return tag;
    });
    dispatch({
      type: 'SET_EDITOR_TAGS',
      tags: newEditorTags,
    });
  }
}

export default removeTag;
