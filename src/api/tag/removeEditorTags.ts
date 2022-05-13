import store from '../../storage/storage';
import { AppState } from '../../types';
import getExistTags from './getExistTags';

export default function removeEditorTag(
  value: string,
  path: string,
  state: AppState,
  dispatch: any
) {
  const { editor, note } = state;
  const tags = store.get('tags');
  const res = tags.concat();
  for (let i = 0; i < tags.length; i++) {
    if (tags[i].name === value) {
      if (tags[i].paths.length === 1) {
        res.splice(i, 1);
      } else {
        const newPaths = tags[i].paths.filter((e: string) => {
          return e !== path;
        });
        res[i].paths = newPaths;
      }
    }
  }
  const sorted = getExistTags(res);
  const newEditorTags = editor.tags.filter((e: any) => {
    return e !== value;
  });
  dispatch({
    type: 'SET_EDITOR_TAGS',
    tags: newEditorTags,
  });
  dispatch({
    type: 'SET_TAGS',
    tags: sorted,
  });
  store.set('tags', sorted);
  if (state.note.listType === 'tag' && state.note.selectedTag.name === value) {
    const paths: string[] = state.note.selectedTag.paths.concat();
    const newPaths = paths.filter((path: string) => {
      return path !== editor.path;
    });
    dispatch({
      type: 'SET_SELECTED_TAG',
      title: value,
      selectedTag: { name: value, paths: newPaths },
    });
  }
}
