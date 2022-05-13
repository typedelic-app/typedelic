import styled from 'styled-components';

const Wrapper = styled.pre`
  position: relative;
  min-height: 35px;
  margin: 20px 0;
  background: var(--editorbg);
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  .CodeMirror {
    width: 100%;
    max-width: 100%;
    padding: 8px 5px 8px 5px;
    margin: 0;
    height: auto;
    border-radius: 0;
    overflow: hidden;
    .CodeMirror-line {
      font-family: var(--code-font-family);
      font-size: 14px;
      letter-spacing: 0 !important;
    }
    .CodeMirror-cursors {
      visibility: hidden;
    }
  }
  span.meta {
    background: var(--primary);
    background: rgba(255, 255, 255, 0.1);
    color: var(--text);
    font-size: 0.8em;
    padding: 0px 15px;
    position: absolute;
    z-index: 99999999;
    font-family: var(--font-family);
  }
  &.includeMeta {
    .CodeMirror {
      padding: 26px 5px 8px 5px;
    }
  }
`;

export default Wrapper;
