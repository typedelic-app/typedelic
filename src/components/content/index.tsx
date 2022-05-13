import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Preview from '../preview';
import Editor from '../editor';
import Split from './split';
import Header from './header';

const Content = (props: any) => {
  const viewMode = useSelector((state: any) => state.view.viewMode);
  return (
    <Wrapper className="editor-area" width={props.width}>
      <div className="content-header">
        <Header />
      </div>
      <div className="content-bottom">
        {viewMode === 'editor' ? (
          <Editor key="pane-1" />
        ) : viewMode === 'preview' ? (
          <Preview key="pane-2" />
        ) : (
          <Split key="pane-3" />
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: var(--editorbg);
  width: 100%;
  max-width: ${(props: any) => `${props.width}px`};
  height: 100%;
  .content-header {
    width: 100%;
    height: 90px;
  }
  .content-bottom {
    width: 100%;
    height: calc(100% - 90px);
  }
`;

export default Content;
