import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import api from '../../api';
import { AppState } from '../../types';
const { Menu, MenuItem, getCurrentWindow } = require('electron').remote;

const contextMenu = (props: { name: () => void; date: any }) => {
  const { name, date } = props;
  const menu = new Menu();
  menu.append(new MenuItem({ label: 'Sort by name', click: name }));
  menu.append(new MenuItem({ label: 'Sort by update date', click: date }));
  return menu;
};

const Sort = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: AppState) => state);
  const setMode = (value: 'name' | 'date') => {
    const data = api.sortNotes(state.note.list, value);
    dispatch({
      type: 'SET_SORT_MODE',
      sortMode: value,
    });
    dispatch({
      type: 'SET_NOTE_LIST',
      list: data,
    });
  };
  function popMenu() {
    const menu = contextMenu({
      name: () => setMode('name'),
      date: () => setMode('date'),
    });
    menu.popup(getCurrentWindow());
  }

  return (
    <Wrapper className="sort-bar">
      <span onClick={popMenu}>
        Sort by <b>{state.note.sortMode}</b>
      </span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 25px;
  border-top: 1px solid var(--editorbg);
  border-bottom: 1px solid var(--editorbg);
  background: rgba(255, 255, 255, 0.02);
  padding: 5px 11px;
  font-size: 0.85em;
  font-weight: 400;
  display: flex;
  align-items: center;
  span {
    cursor: pointer;
    opacity: 0.7;
  }
`;

export default Sort;
