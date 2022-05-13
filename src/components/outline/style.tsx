import styled from 'styled-components';

const Wrapper = styled.ul`
  background-color: var(--background);
  padding: 10px;
  padding-top: 0;
  height: 100%;
  overflow-y: scroll;
  li {
    cursor: pointer;
    list-style: none;
    display: flex;
    padding: 5px 0;
    line-height: 1.4;
    font-size: 0.83rem;
    &:hover {
      background: var(--editorbg);
    }
    &.depth-1,
    &.depth-2 {
      position: relative;
      margin-top: 6px;
      padding-left: 8px;
      margin-left: 2px;
      &:before {
        content: '';
        border-radius: 50%;
        width: 4px;
        height: 4px;
        background: var(--primary);
        margin-top: 5px;
        position: absolute;
        left: -3px;
      }
    }
    &.depth-3,
    &.depth-4,
    &.depth-5,
    &.depth-6 {
      border-left: 1px solid rgba(255, 255, 255, 0.15);
    }
    &.depth-3 {
      padding-left: 10px;
    }
    &.depth-4 {
      padding-left: 30px;
    }
    &.depth-5 {
      padding-left: 45px;
    }
    &.depth-6 {
      padding-left: 60px;
    }
  }
  &::-webkit-scrollbar {
    width: 7px;
    height: 7px;
    border-left: 0px solid var(--border);
  }
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
    border-left: solid 1px rgba(255, 255, 255, 0);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0px;
    box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0);
  }
`;

export default Wrapper;
