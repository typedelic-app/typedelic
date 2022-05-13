import { isExistFile } from '../utils';

const getExistTags = (tags: any) => {
  return tags
    .map((e: any) => {
      const paths = e.paths.filter((path: string) => {
        return isExistFile(path);
      });
      return { name: e.name, paths: paths };
    })
    .filter((e: any) => {
      return e.paths.length !== 0;
    });
};

export default getExistTags;
