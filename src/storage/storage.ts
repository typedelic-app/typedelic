import ElectronStore from 'electron-store';

type StoreType = {
  workspace: {
    path: string;
    defaultFolder: string;
    defaultNote: string;
    trashboxPath: string;
    sortMode: 'name' | 'date';
    isNotInitialRender: boolean;
  };
  view: {
    color: string | undefined;
    viewMode: 'editor' | 'split' | 'preview' | 'outline';
  };
  tags: any[];
};

const store = new ElectronStore<StoreType>();
export default store;
