import html2canvas from 'html2canvas';

export async function openImagePreview(data: any, dispatch: any) {
  async function dispatches() {
    dispatch({
      type: 'SET_EDITOR',
      title: data.name,
      markdown: data.markdown,
      path: data.path,
      tags: data.tags,
    });
    setTimeout(() => {
      return;
    }, 1000);
  }
  dispatches().then(function () {
    dispatch({
      type: 'SET_IMAGE_PREVIEW_MODE',
      imagePreviewMode: true,
    });
  });
}

export default function exportAsJpg(state: any, dispatch: any) {
  return new Promise(async function (resolve, reject) {
    const source: any = await document.querySelector('#output-area');
    html2canvas(source, {
      allowTaint: true,
    })
      .then(function (canvas: any) {
        const a = document.createElement('a');
        a.href = canvas
          .toDataURL('image/jpeg')
          .replace('image/jpeg', 'image/octet-stream');
        a.download = `${state.editor.title}.jpg`;
        a.click();
      })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject();
      });
  });
}
