import React from 'react';
import styled from 'styled-components';
import Drag from '../../elements/drag';
import Title from './title';
import Folder from './folder';
import ModeSwitch from './modeSwitch';
import ColorSwitch from './colorSwitch';
import Tag from './tag';

const Wrapper = styled.div`
  background: var(--background);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  user-select: none;
  .top {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    form {
      width: calc(100% - 250px);
    }
    input {
      width: 100%;
      font-size: 1.3em;
      font-weight: 600;
    }
    .right {
      margin-left: auto;
      display: flex;
      align-items: center;
      padding-bottom: 4px;
    }
    .mode-switch {
      margin-right: 15px;
    }
    .color-switch {
      margin-right: 5px;
    }
  }
  .bottom {
    margin-top: auto;
    width: 100%;
    height: 30px;
    padding: 0 5px;
    display: flex;
    align-items: center;
    border-top: 1px solid var(--editorbg);
    border-bottom: 1px solid var(--editorbg);
    background: rgba(255, 255, 255, 0.02);
    font-size: 0.9em;
    overflow-x: scroll;
    overflow-y: hidden;
    .inner {
      display: flex;
      align-items: center;
      min-width: 100%;
      overflow-x: scroll;
    }
  }
`;

const Header = () => {
  return (
    <Wrapper>
      <Drag width="100%" height="19px" />
      <div className="top">
        <Title />
        <div className="right">
          <ModeSwitch />
          <ColorSwitch />
        </div>
      </div>
      <div className="bottom">
        <div className="inner">
          <Folder />
          <Tag />
        </div>
      </div>
    </Wrapper>
  );
};

export default Header;
