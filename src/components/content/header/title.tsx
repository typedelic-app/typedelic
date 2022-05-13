import React, { createRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import store from '../../../storage/storage';
import api from '../../../api';

const Title = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const { editor } = state;
  const input: any = createRef();
  const trashPath: string = store.get('workspace.trashboxPath');

  const isTrash = useMemo(() => {
    if (editor.path !== '') {
      const dir = editor.path.slice(0, trashPath.length);
      return dir === trashPath;
    } else return false;
  }, [editor.path]);

  async function handleRename() {
    if (editor.title !== '' && editor.path !== '' && !isTrash) {
      api.renameFile(editor.path, editor.title, state, dispatch);
    }
  }
  const submitHandle = (e: any) => {
    e.preventDefault();
    if (isTrash) return;
    handleRename();
    input.current.blur();
  };
  return (
    <form onSubmit={(e: any) => submitHandle(e)}>
      <input
        className="title-input"
        ref={input}
        value={editor.title}
        onChange={(e: any) => {
          if (isTrash) return;
          dispatch({
            type: 'SET_EDITOR_TITLE',
            title: e.target.value,
          });
        }}
        onBlur={handleRename}
        placeholder="title"
        spellCheck="false"
      />
    </form>
  );
};

export default Title;
