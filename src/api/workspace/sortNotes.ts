import store from '../../storage/storage';

export default function sortFiles(data: any, sortMode: string) {
  store.set('workspace.sortMode', sortMode);
  if (sortMode === 'name') {
    return data.sort((a: any, b: any) => {
      if (a.name > b.name) return 1;
      else return -1;
    });
  } else {
    return data.sort((a: any, b: any) => {
      if (a.date < b.date) return 1;
      else return -1;
    });
  }
}
