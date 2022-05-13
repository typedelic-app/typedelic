import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api';
import Drag from '../elements/drag';
import Note from './note';
import Search from './search';
import Sort from './sort';
import { NotesBarWrapper } from './style';
import { AppState } from '../../types';

const NoteBar = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: AppState) => state);
  const { note, editor } = state;

  const handleCreateFile = () => {
    api.createFile(state.note.selectedFolder.path, state, dispatch);
  };

  const getTrashedName = (name: string) => {
    const arr = name.split('_');
    arr.pop();
    return arr.join('_');
  };

  const listToShow: any[] = useMemo(() => {
    if (note.searchValue !== '') return note.searched;
    else return note.list;
  }, [note.list, note.searchValue]);

  useEffect(() => {
    api.reloadNotes(state, dispatch);
  }, [editor.path, note.listType, note.selectedFolder, note.selectedTag]);

  const isTrash: boolean = useMemo(() => {
    return note.listType === 'trash';
  }, [note.list]);

  return (
    <NotesBarWrapper className="notesbar">
      <div className="inner">
        <div className="header">
          <Drag>
            <div className="header-area">
              <span className="title">{state.note.title}</span>
              {isTrash ? (
                ''
              ) : (
                <button onClick={handleCreateFile}>
                  <i className="fas fa-plus"></i>
                </button>
              )}
            </div>
          </Drag>
          <Search />
        </div>
        <Sort />
        <div className="note-list">
          <div className="note-list-inner">
            {listToShow.length === 0 ? (
              <span className="no-files">NO DATA</span>
            ) : (
              listToShow.map((e: any) => {
                return (
                  <Note
                    key={e.fullPath}
                    name={isTrash ? getTrashedName(e.name) : e.name}
                    path={e.fullPath}
                    date={e.date}
                    excerpt={e.excerpt}
                    tags={e.tags}
                    tasks={e.tasks}
                    active={editor.path === e.fullPath}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </NotesBarWrapper>
  );
};

export default NoteBar;
