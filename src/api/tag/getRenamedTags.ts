export default async function getRenamedTags(
  oldPath: string,
  newPath: string,
  tags: any,
  type: 'file' | 'folder'
) {
  if (type === 'file') {
    return tags.map((e: any) => {
      const renamed = e.paths.map((p: string) => {
        if (p === oldPath) return newPath;
        else return p;
      });
      return { name: e.name, paths: renamed };
    });
  } else if (type === 'folder') {
    return tags.map((e: any) => {
      const renamed = e.paths.map((p: string) => {
        const str = p.substr(0, oldPath.length);
        if (str === oldPath) {
          const path = p.replace(oldPath, newPath);
          return path;
        } else {
          return p;
        }
      });
      return { name: e.name, paths: renamed };
    });
  }
}
