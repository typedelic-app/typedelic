import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import store from '../../../storage/storage';

const ModeSwitch = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: any) => state.view.viewMode);
  const setViewMode = (newMode: string) => {
    store.set('view.viewMode', newMode);
    dispatch({
      type: 'SET_VIEWMODE',
      viewMode: newMode,
    });
  };
  return (
    <Wrapper className="mode-switch">
      <button
        type="button"
        className={mode === 'editor' ? 'active' : ''}
        onClick={() => setViewMode('editor')}
      >
        Editor
      </button>
      <button
        type="button"
        className={mode === 'preview' ? 'active' : ''}
        onClick={() => setViewMode('preview')}
      >
        Preview
      </button>
      <button
        type="button"
        className={mode === 'split' ? 'active' : ''}
        onClick={() => setViewMode('split')}
      >
        Split
      </button>
      <button
        type="button"
        className={mode === 'outline' ? 'active' : ''}
        onClick={() => setViewMode('outline')}
      >
        Outline
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  border-radius: 3px;
  overflow: hidden;
  height: 23px;
  button {
    width: 65px;
    font-size: 0.8em;
    color: var(--lightGray);
    -webkit-app-region: none;
    line-height: 1;
    font-weight: 600;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    cursor: pointer !important;
    border-right: 1px solid var(--background);
    transition: 0.2s ease;
    background: rgba(255, 255, 255, 0.1);
    &:last-child {
      border-right: 0;
    }
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    &.active {
      background-color: var(--primary);
      color: var(--editorbg);
    }
  }
`;

export default ModeSwitch;
