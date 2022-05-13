import React, { useState } from 'react';
import store from '../../storage/storage';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api';
import { AppState } from '../../types';
import { NoteWrapper, Progress, ProgressBar } from './style';

const { Menu, MenuItem, getCurrentWindow } = require('electron').remote;

const contextMenu = (props: {
  data: any;
  remove: any;
  state: any;
  dispatch: any;
}) => {
  const { data, remove, state, dispatch } = props;
  const menu = new Menu();

  menu.append(
    new MenuItem({
      label: 'Export as...',
      submenu: [
        {
          label: 'markdown',
          click: () => api.exportAsMd(data),
        },
        {
          label: 'pdf',
          click: () => {
            api.openPdfPreview(data, dispatch);
          },
        },
        {
          label: 'jpg',
          click: () => api.openImagePreview(data, dispatch),
        },
      ],
    })
  );
  menu.append(new MenuItem({ type: 'separator' }));
  menu.append(new MenuItem({ label: 'Move to Trash', click: remove }));

  return menu;
};

const contextMenuForTrash = (props: { remove: any }) => {
  const { remove } = props;
  const menu = new Menu();
  menu.append(new MenuItem({ label: 'Delete Permanently', click: remove }));
  return menu;
};

const Note = (props: {
  name: string;
  path: string;
  date: string;
  excerpt: string;
  tags: string[];
  tasks: any;
  active: boolean;
}) => {
  const { name, path, date, excerpt, tags, tasks, active } = props;
  const dispatch = useDispatch();
  const state = useSelector((state: AppState) => state);
  const { note, editor } = state;
  const [drag, setDrag] = useState(false);

  async function handleOnClick() {
    if (editor.path === '' && editor.markdown !== '') {
      api.saveNewFile(editor.markdown, editor.title, state, dispatch);
    }
    const markdown = await api.readFile(path);
    const tags = await api.getTagsForNote(path);
    dispatch({
      type: 'SET_EDITOR',
      title: name,
      markdown: markdown,
      path,
      tags: tags,
    });
  }

  function handleRemove() {
    api.removeFile(path, state, dispatch);
  }

  function removePermanently() {
    api.removePermanently(path, state, dispatch);
    api.reloadNotes(state, dispatch);
  }

  async function popMenu() {
    if (note.listType === 'trash') {
      const menu = contextMenuForTrash({
        remove: removePermanently,
      });
      menu.popup(getCurrentWindow());
    } else {
      const markdown = await api.readFile(path);
      const tags = await api.getTagsForNote(path);
      const info = {
        name,
        markdown,
        path,
        tags,
      };
      const menu = contextMenu({
        data: info,
        remove: handleRemove,
        state: state,
        dispatch: dispatch,
      });
      menu.popup(getCurrentWindow());
    }
  }

  return (
    <NoteWrapper
      className={`note ${active ? 'active' : ''} ${drag ? 'drag' : ''}`}
      onClick={handleOnClick}
      onContextMenu={popMenu}
      onDragStart={() => {
        dispatch({
          type: 'SET_DRAG_ITEM',
          dragItem: { name, path, type: 'file' },
        });
        setDrag(true);
      }}
      onDrag={() => {
        setDrag(false);
      }}
      onDragEnd={() => {
        setDrag(false);
      }}
      draggable="true"
    >
      <h2>{name}</h2>
      <p>{excerpt}</p>
      <div className="bottom">
        <span className="date">{date ? date.split('__')[0] : ''}</span>
        {tasks && (tasks.done !== 0 || tasks.unDone !== 0) ? (
          <Progress
            className={`progress ${active ? 'active' : ''}`}
            percent={tasks.perc}
            active={active}
          >
            <span className="count">
              {tasks.done} / {tasks.done + tasks.unDone}
            </span>
            <ProgressBar
              percent={tasks.perc}
              active={active}
              className={`${active ? 'active' : ''}`}
            />
          </Progress>
        ) : (
          ''
        )}
      </div>
    </NoteWrapper>
  );
};

export default Note;
