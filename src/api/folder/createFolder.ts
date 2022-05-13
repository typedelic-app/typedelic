const fs = require('fs-extra');
import getAllData from '../workspace/getAllData';

async function createFolder(dir: string, workspace: any, dispatch: any) {
  let i = 1;
  function write(p: string) {
    fs.mkdir(p, { recursive: true }, (error: any) => {
      if (error) throw error;
    });
  }
  function check() {
    const path = `${dir}/folder-${i}`;
    fs.access(path, fs.constants.R_OK, (error: any) => {
      if (error) {
        write(path);
        setTimeout(() => {
          const data = getAllData(workspace.path);
          data.then((e: any) => {
            dispatch({
              type: 'SET_ALL_FOLDERS',
              allFolders: e.folders,
            });
          });
        }, 100);
      } else {
        i += 1;
        check();
      }
    });
  }
  check();
}

export default createFolder;
