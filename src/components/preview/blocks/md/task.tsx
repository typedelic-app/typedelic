import api from '../../../../api';
import * as Comlink from 'comlink';
// @ts-ignore
import MyWorker from '../../../../workers/main.worker';
const worker = new MyWorker();
const comlinked: any = Comlink.wrap(worker);

export async function taskCheckedAction(
  tasks: any,
  editor: any,
  dispatch: any
) {
  for (let i = 0; i < tasks.length; i++) {
    tasks[i].disabled = false;
    tasks[i].addEventListener('click', async function () {
      let line = Number(tasks[i].parentNode.id.split('-')[1]);
      if (tasks[i].parentNode.id.split('-')[1] === undefined) {
        line = Number(tasks[i].parentNode.parentNode.id.split('-')[1]);
      }
      if (line) {
        await comlinked.task.check(editor.markdown, line);
        const taskMD = await comlinked.task.md;
        setTimeout(() => {
          dispatch({
            type: 'SET_MARKDOWN',
            markdown: taskMD,
          });
          api.saveFile(editor.path, taskMD);
        }, 10);
      }
    });
  }
}
