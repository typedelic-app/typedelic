export default function searchTags(
  value: string,
  path: string,
  tags: any[]
): { status: string; index: number } {
  let res = { status: 'addTag', index: 0 };
  for (let i = 0; i < tags.length; i++) {
    if (tags[i].name === value) {
      const filtered = tags[i].paths.filter((e: string) => {
        return e === path;
      });
      if (filtered.length === 0) {
        res.status = 'addPath';
        res.index = i;
      } else {
        res.status = 'exist';
      }
    }
  }
  return res;
}
