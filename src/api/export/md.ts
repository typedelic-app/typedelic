const fs = require('fs-extra');
const remote = require('electron').remote;
const { dialog } = remote;

export default function exportAsMd(data: any) {
  const win = dialog.showSaveDialog(remote.getCurrentWindow(), {
    defaultPath: `${data.name}`,
    filters: [{ name: 'Markdown', extensions: ['md', 'MD'] }],
  });
  win.then((e: any) => {
    if (!e.canceled) {
      if (e.filePath !== '') {
        fs.writeFileSync(e.filePath, data.markdown);
      }
    }
  });
}
