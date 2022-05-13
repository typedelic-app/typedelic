import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api';
import Drag from '../elements/drag';
import Tree from './tree';
import Trash from './trashbox';
import Tags from './tags';
import { SidebarWrapper } from './style';
import { AppState } from '../../types';

const { Menu, MenuItem, getCurrentWindow } = require('electron').remote;

const contextMenu = (props: { createFolder: any }) => {
  const { createFolder } = props;
  const menu = new Menu();
  menu.append(
    new MenuItem({ label: 'Create New Folder', click: createFolder })
  );
  return menu;
};

const Sidebar = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: AppState) => state);
  const { note, workspace } = state;
  const [hover, setHover] = useState(false);

  const handleOnClick = () => {
    if (note.listType === 'all') return;
    dispatch({
      type: 'RESET_SELECTED',
    });
  };

  async function handleCreateFolder() {
    api.createFolder(workspace.path, workspace, dispatch);
  }
  function popMenu() {
    const menu = contextMenu({
      createFolder: handleCreateFolder,
    });
    menu.popup(getCurrentWindow());
  }

  const onDragOver = (e: any) => {
    let event = e as Event;
    event.stopPropagation();
    event.preventDefault();
  };

  const onDragEnter = (e: any) => {
    let event = e as Event;
    event.stopPropagation();
    setHover(true);
  };

  const onDragLeave = () => {
    setHover(false);
  };

  const onFileDrop = (e: any) => {
    let event = e as Event;
    event.stopPropagation();
    setHover(false);
    if (
      workspace.dragItem.name !== '' &&
      workspace.dragItem.path !== '' &&
      workspace.dragItem.type === 'folder'
    ) {
      api
        .moveFolder(
          workspace.dragItem.path,
          `${workspace.path}/${workspace.dragItem.name}`,
          state,
          dispatch
        )
        .then(() => {
          dispatch({
            type: 'SET_DRAG_ITEM',
            dragItem: { name: '', path: '', type: 'file' },
          });
        });
    }
  };

  return (
    <SidebarWrapper className="sidebar">
      <div className="inner">
        <Drag width="100%" height="40px" />
        <div className="sidebar-content">
          <h2
            className={hover ? 'hover' : ''}
            onContextMenu={popMenu}
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDrop={onFileDrop}
            onDragLeave={onDragLeave}
          >
            <i className="fas fa-book icon" onClick={handleOnClick} />
            <span onClick={handleOnClick}>All Notes</span>
            <button className="add-button" onClick={handleCreateFolder}>
              <i className="fas fa-plus" />
            </button>
          </h2>
          <Tree files={workspace.allFolders} />
          <Trash />
          <Tags />
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
