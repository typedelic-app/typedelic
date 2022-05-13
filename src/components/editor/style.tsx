import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  position: relative;
  .CodeMirror,
  .CodeMirror .CodeMirror-gutters {
    padding: 0;
    background-color: var(--editorbg);
    .CodeMirror-placeholder {
      color: rgba(255, 255, 255, 0.2);
    }
  }
  .CodeMirror .CodeMirror-linenumbers {
    background: var(--editorbg);
  }
  .CodeMirror-sizer {
    padding-top: 7px;
  }
  &.half {
    border-right: 1px solid var(--border);
  }
  .CodeMirror pre.CodeMirror-line {
    font-family: var(--code-font-family);
    line-height: 1.85;
    font-size: 14px;
    padding-right: 18px;
    letter-spacing: 0rem;
    word-wrap: break-word;
    word-break: break-all;
    -webkit-font-kerning: normal;
    font-kerning: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: auto;
    -webkit-text-stroke: 1px transparent;
    color: var(--text);
  }
  .CodeMirror-vscrollbar {
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
  }
`;

export default Wrapper;
