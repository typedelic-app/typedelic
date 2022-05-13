import store from '../storage/storage';
const workspace = store.get('workspace');

const initialState = {
  title: 'All Files',
  selectedFolder: { name: '', path: '' },
  selectedTag: { name: '', paths: [] },
  listType: 'all',
  list: [],
  sortMode: workspace.sortMode ? workspace.sortMode : 'name',
  sorted: [],
  searchValue: '',
  searched: [],
};

const reducer = (
  state = initialState,
  action: {
    type: string;
    title: string;
    selectedFolder: any;
    selectedTag: any;
    listType: 'folder' | 'tag' | 'all' | 'trash';
    list: any[];
    sortMode: 'name' | 'date';
    searched: any[];
    searchValue: string;
  }
) => {
  switch (action.type) {
    case 'SET_NOTE_TITLE':
      return {
        ...state,
        title: action.title,
      };
    case 'SET_NOTE_LIST':
      return {
        ...state,
        list: action.list,
      };
    case 'SET_SELECTED_FOLDER':
      return {
        ...state,
        title: action.title,
        selectedFolder: action.selectedFolder,
        selectedTag: initialState.selectedTag,
        listType: 'folder',
      };
    case 'SET_SELECTED_TAG':
      return {
        ...state,
        title: action.title,
        selectedTag: action.selectedTag,
        selectedFolder: initialState.selectedFolder,
        listType: 'tag',
      };
    case 'SHOW_TRASH':
      return {
        ...state,
        title: 'Trash',
        selectedTag: initialState.selectedTag,
        selectedFolder: initialState.selectedFolder,
        listType: 'trash',
      };
    case 'RESET_SELECTED':
      return {
        ...state,
        title: 'All Files',
        selectedTag: initialState.selectedTag,
        selectedFolder: initialState.selectedFolder,
        listType: 'all',
      };
    case 'SET_SORT_MODE':
      return {
        ...state,
        sortMode: action.sortMode,
      };
    case 'SET_SEARCHED':
      return {
        ...state,
        searched: action.searched,
      };
    case 'SET_SEARCH_VALUE':
      return {
        ...state,
        searchValue: action.searchValue,
      };

    default:
      return state;
  }
};

export default reducer;
