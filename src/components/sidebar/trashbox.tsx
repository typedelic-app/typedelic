import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api';
import { AppState } from '../../types';

const { Menu, MenuItem, getCurrentWindow } = require('electron').remote;

const contextMenu = (props: { emptyTrash: any }) => {
  const { emptyTrash } = props;
  const menu = new Menu();
  menu.append(new MenuItem({ label: 'Empty Trash', click: emptyTrash }));
  return menu;
};

const Trashbox = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: AppState) => state);
  const { note } = state;
  async function handleOnClick() {
    dispatch({
      type: 'SHOW_TRASH',
    });
  }
  function popMenu() {
    const menu = contextMenu({
      emptyTrash: handleEmptyTrash,
    });
    menu.popup(getCurrentWindow());
  }

  function handleEmptyTrash() {
    api.emptyTrash(state, dispatch);
  }

  return (
    <div
      onClick={handleOnClick}
      onContextMenu={popMenu}
      className={note.listType === 'trash' ? 'active' : ''}
    >
      <h2
        className={note.listType === 'trash' ? 'active' : ''}
        style={{ padding: '2px 5px 0px 5px' }}
      >
        <i className="fas fa-trash-alt icon" style={{ marginTop: '1px' }}></i>
        <span>Trash</span>
      </h2>
    </div>
  );
};

export default Trashbox;
