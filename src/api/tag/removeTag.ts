import store from '../../storage/storage';
import { Dispatch } from 'react';
import { AppState } from '../../types';

function removeTag(tagName: string, state: AppState, dispatch: Dispatch<any>) {
  const { editor } = state;
  const tags = store.get('tags');
  const newTags = tags.filter((tag: any) => {
    return tag.name !== tagName;
  });
  store.set('tags', newTags);
  dispatch({
    type: 'SET_TAGS',
    tags: newTags,
  });
  if (editor.tags.length !== 0) {
    const newEditorTags = editor.tags.filter((tag: string) => {
      return tag !== tagName;
    });
    dispatch({
      type: 'SET_EDITOR_TAGS',
      tags: newEditorTags,
    });
  }
  if (state.note.selectedTag.name === tagName) {
    dispatch({
      type: 'RESET_SELECTED',
    });
  }
}

export default removeTag;
