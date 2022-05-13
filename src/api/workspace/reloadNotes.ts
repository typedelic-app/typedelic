import store from '../../storage/storage';
import api from '..';

const reloadNotes = (state: any, dispatch: any) => {
  const trashPath: string = store.get('workspace.trashboxPath');
  if (state.note.listType === 'folder') {
    api
      .getFolderedNotes(state.note.selectedFolder.path)
      .then((list: any) => {
        dispatch({
          type: 'SET_NOTE_LIST',
          list,
        });
      })
      .then(() => {
        dispatch({
          type: 'SET_SEARCH_VALUE',
          searchValue: '',
        });
      });
  } else if (state.note.listType === 'tag') {
    api
      .getTaggedNotes(state.note.selectedTag.name)
      .then((list: any) => {
        dispatch({
          type: 'SET_NOTE_LIST',
          list,
        });
      })
      .then(() => {
        dispatch({
          type: 'SET_SEARCH_VALUE',
          searchValue: '',
        });
      });
  } else if (state.note.listType === 'trash') {
    api
      .getFolderedNotes(trashPath)
      .then((list: any) => {
        dispatch({
          type: 'SET_NOTE_LIST',
          list,
        });
      })
      .then(() => {
        dispatch({
          type: 'SET_SEARCH_VALUE',
          searchValue: '',
        });
      });
  } else {
    api
      .getAllNotes(state.workspace.path)
      .then((e: any) => {
        dispatch({
          type: 'SET_NOTE_LIST',
          list: e.files,
        });
      })
      .then(() => {
        dispatch({
          type: 'SET_SEARCH_VALUE',
          searchValue: '',
        });
      });
  }
};

export default reloadNotes;
