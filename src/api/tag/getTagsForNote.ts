import store from '../../storage/storage';

export default function getTagsForNote(path: string): string[] {
  const tags = store.get('tags');
  const res = [];
  for (let i = 0; i < tags.length; i++) {
    for (let ii = 0; ii < tags[i].paths.length; ii++) {
      if (tags[i].paths[ii] === path) {
        res.push(tags[i].name);
      }
    }
  }
  return res;
}
