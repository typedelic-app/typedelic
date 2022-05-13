import { combineReducers } from 'redux';
import editorReducer from './editorReducer';
import viewReducer from './viewReducer';
import workspaceReducer from './workspaceReducer';
import notesReducer from './noteReducer';

const rootReducer = () =>
  combineReducers({
    editor: editorReducer,
    view: viewReducer,
    note: notesReducer,
    workspace: workspaceReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
