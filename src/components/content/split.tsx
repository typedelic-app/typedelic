import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Preview from '../preview';
import Editor from '../editor';
import Outline from '../outline';

const Wrapper = styled.div`
  background: var(--editorbg);
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  .pane {
    width: 50%;
    height: 100%;
  }
  &.outline {
    .pane {
      width: calc(100% - 245px);
    }
    .preview {
      width: 245px;
    }
  }
`;

const Split = () => {
  const viewMode = useSelector((state: any) => state.view.viewMode);
  const editor = useSelector((state: any) => state.editor);

  const dispatch = useDispatch();

  useEffect(() => {
    const str = editor.markdown + '\n';
    dispatch({
      type: 'SET_MARKDOWN',
      markdown: str,
      line: 0,
    });
    setTimeout(() => {
      dispatch({
        type: 'SET_MARKDOWN',
        markdown: str.slice(0, -1),
        line: 0,
      });
    }, 200);
  }, [viewMode]);

  return (
    <Wrapper className={viewMode}>
      <div key="pane-1" className="pane pane-1 editor">
        <Editor key={1} />
      </div>
      <div key="pane-2" className="pane pane-2 preview">
        {viewMode === 'split' ? <Preview key={2} /> : <Outline key={2} />}
      </div>
    </Wrapper>
  );
};

export default Split;
