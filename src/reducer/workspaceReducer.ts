import store from '../storage/storage';
const workspace = store.get('workspace');
const tags = store.get('tags');

const initialState = {
  path: workspace.path,
  defaultFolder: workspace.defaultFolder,
  defaultNote: workspace.defaultNote,
  allFolders: [],
  allFiles: [],
  dragItem: { name: '', path: '', type: 'file' },
  tags: tags || [],
};

const reducer = (
  state = initialState,
  action: {
    type: string;
    path: string;
    allFolders: any;
    allFiles: any;
    dragItem: any;
    tags: any;
  }
) => {
  switch (action.type) {
    case 'SET_PATH':
      return {
        ...state,
        path: action.path,
      };
    case 'SET_ALL_FOLDERS':
      return {
        ...state,
        allFolders: action.allFolders,
      };
    case 'SET_WORKSPACE':
      return {
        ...state,
        path: action.path,
        allFolders: action.allFolders,
      };
    case 'SET_DRAG_ITEM':
      return {
        ...state,
        dragItem: action.dragItem,
      };
    case 'SET_TAGS':
      return {
        ...state,
        tags: action.tags,
      };
    default:
      return state;
  }
};

export default reducer;
