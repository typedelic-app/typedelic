import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api';
// @ts-ignore
import { ListWrapper, ArrowIcon } from './style';
import { AppState } from '../../types';

const { Menu, MenuItem, getCurrentWindow } = require('electron').remote;

const contextMenu = (props: {
  createFile: any;
  createFolder: any;
  remove: any;
  rename: any;
}) => {
  const { createFile, createFolder, rename, remove } = props;
  const menu = new Menu();
  menu.append(new MenuItem({ label: 'Create New File', click: createFile }));
  menu.append(
    new MenuItem({ label: 'Create New Folder', click: createFolder })
  );
  menu.append(new MenuItem({ type: 'separator' }));
  menu.append(new MenuItem({ label: 'Rename Folder', click: rename }));
  menu.append(new MenuItem({ label: 'Delete Folder', click: remove }));
  return menu;
};

const contextMenuForDefault = (props: {
  createFile: any;
  createFolder: any;
}) => {
  const { createFile, createFolder } = props;
  const menu = new Menu();
  menu.append(new MenuItem({ label: 'Create New File', click: createFile }));
  menu.append(
    new MenuItem({ label: 'Create New Folder', click: createFolder })
  );
  return menu;
};

const Folder = (props: any) => {
  const { name, fullPath, active, onClick, hasChildren, isOpen } = props;
  const depth = hasChildren ? props.depth : props.depth + 1;
  const dispatch = useDispatch();
  const state = useSelector((state: AppState) => state);
  const { note, workspace } = state;
  const input: any = useRef();
  const [renameMode, setRenameMode] = useState(false);
  const [value, setValue] = useState(name);
  const [hover, setHover] = useState(false);

  async function handleOnClick(name: string, fullPath: string) {
    if (note.selectedFolder.path === fullPath) return;
    dispatch({
      type: 'SET_SELECTED_FOLDER',
      title: name,
      selectedFolder: { name, path: fullPath },
    });
  }

  async function handleRename(e: any) {
    e.preventDefault();
    api.renameFolder(fullPath, value, state, dispatch).then(() => {
      input.current.blur();
    });
  }
  const handleRenameMode = () => {
    setRenameMode(true);
    input.current.focus();
    input.current.select();
  };

  const handleRemove = () => {
    api.removeFolder(fullPath, state, dispatch);
  };

  const handleCreateFile = () => {
    if (onClick && !isOpen) {
      onClick();
    }
    api.createFile(fullPath, state, dispatch);
  };

  const handleCreateFolder = () => {
    if (onClick && !isOpen) {
      onClick();
    }
    api.createFolder(fullPath, workspace, dispatch);
  };

  function popMenu() {
    if (workspace.defaultFolder !== fullPath) {
      const menu = contextMenu({
        createFile: handleCreateFile,
        createFolder: handleCreateFolder,
        rename: handleRenameMode,
        remove: handleRemove,
      });
      menu.popup(getCurrentWindow());
    } else {
      const menu = contextMenuForDefault({
        createFile: handleCreateFile,
        createFolder: handleCreateFolder,
      });
      menu.popup(getCurrentWindow());
    }
  }

  const onDragStart = () => {
    dispatch({
      type: 'SET_DRAG_ITEM',
      dragItem: { name, path: fullPath, type: 'folder' },
    });
  };

  const onDragOver = (e: any) => {
    let event = e as Event;
    event.stopPropagation();
    event.preventDefault();
    setHover(true);
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
      fullPath !== workspace.dragItem.path
    ) {
      if (workspace.dragItem.type === 'file') {
        api.moveFile(
          workspace.dragItem.path,
          `${fullPath}/${workspace.dragItem.name}`,
          state,
          dispatch
        );
      } else if (workspace.dragItem.type === 'folder') {
        api.moveFolder(
          workspace.dragItem.path,
          `${fullPath}/${workspace.dragItem.name}`,
          state,
          dispatch
        );
      }
    }
  };

  return (
    <ListWrapper
      depth={depth}
      className={`${active ? 'active' : ''} ${hover ? 'hover' : ''}`}
      onContextMenu={popMenu}
      onDoubleClick={() => {
        setRenameMode(!setRenameMode);
      }}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={onFileDrop}
      onDragLeave={onDragLeave}
      draggable={workspace.defaultFolder !== fullPath}
    >
      <div className="list-inner">
        {hasChildren ? (
          <ArrowIcon isOpen={isOpen} onClick={onClick}>
            <span />
          </ArrowIcon>
        ) : (
          ''
        )}
        <span
          className="list-name"
          onClick={() => handleOnClick(name, fullPath)}
        >
          {renameMode ? (
            <form onSubmit={handleRename}>
              <input
                type="text"
                ref={input}
                value={value}
                onChange={(e: any) => setValue(e.target.value)}
                onBlur={() => setRenameMode(false)}
                spellCheck="false"
              />
            </form>
          ) : (
            name
          )}
        </span>
      </div>
    </ListWrapper>
  );
};

export default Folder;
