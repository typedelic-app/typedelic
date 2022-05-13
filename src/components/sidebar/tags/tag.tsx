import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../api';
import { AppState } from '../../../types';
import { TagWrapper } from './style';

const { Menu, MenuItem, getCurrentWindow } = require('electron').remote;
const contextMenu = (props: { handleRemove: any; handleRename: any }) => {
  const { handleRemove, handleRename } = props;
  const menu = new Menu();
  menu.append(new MenuItem({ label: 'Rename Tag', click: handleRename }));
  menu.append(new MenuItem({ label: 'Remove Tag', click: handleRemove }));
  return menu;
};

const Tags = (props: any) => {
  const { name, paths } = props;
  const dispatch = useDispatch();
  const state = useSelector((state: AppState) => state);
  const [renameMode, switchRenameMode] = useState(false);
  const input: any = useRef();
  const [renameValue, setRenameValue] = useState('');

  const handleOnClick = (name: string, paths: string[]) => {
    dispatch({
      type: 'SET_SELECTED_TAG',
      title: name,
      selectedTag: { name, paths },
    });
  };

  const handleRenameMode = (status: boolean) => {
    switchRenameMode(status);
    input.current.focus();
    input.current.select();
  };

  const handleRename = (form: any) => {
    form.preventDefault();
    api.renameTag(name, renameValue, state, dispatch);
    input.current.blur();
  };

  const handleRemove = () => {
    api.removeTag(name, state, dispatch);
  };

  const popMenu = () => {
    const menu = contextMenu({
      handleRename: () => handleRenameMode(true),
      handleRemove: handleRemove,
    });
    menu.popup(getCurrentWindow());
  };

  return (
    <TagWrapper
      key={name}
      onClick={() => handleOnClick(name, paths)}
      className={name === state.note.selectedTag.name ? 'active' : ''}
      onContextMenu={popMenu}
    >
      {renameMode === true ? (
        <form onSubmit={(form: any) => handleRename(form)}>
          <input
            ref={input}
            defaultValue={name}
            onChange={(e) => setRenameValue(e.target.value)}
            onBlur={() => handleRenameMode(false)}
          />
        </form>
      ) : (
        <span className="name">{name}</span>
      )}
      <span className="count">{paths.length}</span>
    </TagWrapper>
  );
};

export default Tags;
