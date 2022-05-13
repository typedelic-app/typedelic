let tasklistCounter: any;
let taskDone = 0;
let taskUndone = 0;
const findTask = (raw: string) => {
  taskDone = 0;
  taskUndone = 0;
  const lines = raw.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const mark = lines[i].replace(/^\s+|\s+$/g, '').slice(0, 6);
    if (mark === '- [ ] ' || mark === '* [ ] ') {
      taskUndone++;
    } else if (mark === '- [x] ' || mark === '* [x] ') {
      taskDone++;
    }
  }
};

let newMD: string;
const checkTask = (raw: string, line: number) => {
  const md: any = raw.split('\n');
  const target = md[line - 1];
  let replaced;
  if (target) {
    if (target.includes('- [ ] ')) {
      replaced = md[line - 1].replace('- [ ] ', '- [x] ');
    } else if (target.includes('* [ ] ')) {
      replaced = md[line - 1].replace('* [ ] ', '* [x] ');
    } else if (target.includes('* [x] ')) {
      replaced = md[line - 1].replace('* [x] ', '* [ ] ');
    } else if (target.includes('- [x] ')) {
      replaced = md[line - 1].replace('- [x] ', '- [ ] ');
    }
  }
  md[line - 1] = replaced;
  newMD = md.join('\n');
};

export const task = {
  list: tasklistCounter,
  md: '',
  count(raw: string) {
    findTask(raw);
    this.list = {
      done: taskDone,
      unDone: taskUndone,
      perc: (taskDone / (taskDone + taskUndone)) * 100,
    };
  },
  check(raw: string, line: number) {
    checkTask(raw, line);
    this.md = newMD;
  },
};
