import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import api from '../../api';
import { AppState } from '../../types';

const Search = () => {
  const dispatch = useDispatch();
  const note = useSelector((state: AppState) => state.note);

  function handleOnChange(value: string) {
    dispatch({
      type: 'SET_SEARCH_VALUE',
      searchValue: value,
    });
    api.searchNotes(note.list, value, dispatch);
  }

  return (
    <Wrapper className="search">
      <input
        type="text"
        placeholder="Search..."
        spellCheck="false"
        value={note.searchValue}
        onChange={(e) => handleOnChange(e.target.value)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 0 10px;
  input {
    width: 100%;
    padding: 5px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }
`;

export default Search;
