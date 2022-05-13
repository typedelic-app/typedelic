import fs from 'fs-extra';
import getNotes from './getNotes';
import { isExistFile } from '../utils';

export default async function getFolderedNotes(path: string) {
  if (!isExistFile(path)) return;
  const names = await fs.readdirSync(path);
  const paths = names.map((name: string) => {
    return `${path}/${name}`;
  });
  const res = await getNotes(paths);
  return res;
}
