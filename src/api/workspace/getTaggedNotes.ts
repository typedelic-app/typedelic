import getNotes from './getNotes';
import store from '../../storage/storage';

export default async function setTaggedNotes(name: string) {
  const tags = store.get('tags');
  const target: any = await tags.find((tag: any) => {
    return tag.name === name;
  });
  if (target) {
    const res = await getNotes(target.paths);
    return res;
  }
  return [];
}
