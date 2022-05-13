import store from '../../storage/storage';
import searchTags from './searchTags';

export default async function addTag(
  value: string,
  path: string,
  state: any,
  dispatch: any
) {
  const tags = store.get('tags');
  const res = tags.concat();
  if (path === '') return;
  if (res.length === 0) {
    const tag = { name: value, paths: [path] };
    res.push(tag);
  } else {
    const searchResult = searchTags(value, path, tags);
    if (searchResult.status === 'addTag') {
      const tag = { name: value, paths: [path] };
      res.push(tag);
    } else if (searchResult.status === 'addPath') {
      res[searchResult.index].paths.push(path);
    } else {
    }
  }
  await dispatch({
    type: 'SET_TAGS',
    tags: res,
  });
  await store.set('tags', res);
  if (state.note.listType === 'tag' && state.note.selectedTag.name === value) {
    const paths: string[] = state.note.selectedTag.paths.concat();
    paths.push(path);
    dispatch({
      type: 'SET_SELECTED_TAG',
      title: value,
      selectedTag: { name: value, paths },
    });
  }
}
