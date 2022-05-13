const fs = require('fs-extra');
const remote = require('electron').remote;
const { dialog } = remote;
const ipc = require('electron').ipcRenderer;

export async function openPdfPreview(data: any, dispatch: any) {
  async function dispatches() {
    dispatch({
      type: 'SET_EDITOR',
      title: data.name,
      markdown: data.markdown,
      path: data.path,
      tags: data.tags,
    });
  }
  await dispatches().then(async function () {
    await ipc.send('openWorkerWindow');
    await dispatch({
      type: 'SET_PDF_PREVIEW_MODE',
      pdfPreviewMode: true,
    });
  });
}

export default function exportAsPdf(state: any) {
  return new Promise(async function (resolve, reject) {
    const data = await ipc.invoke('readyToPrintPDF');
    const win = dialog.showSaveDialog(remote.getCurrentWindow(), {
      defaultPath: `${state.editor.title}`,
      filters: [{ name: 'Portable Document Format', extensions: ['pdf'] }],
    });
    win
      .then((e: any) => {
        if (!e.canceled) {
          if (e.filePath !== '') {
            fs.writeFile(e.filePath, data, function (error: any) {
              if (error) {
                throw error;
              }
            });
          }
        }
      })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject();
      });
  });
}
