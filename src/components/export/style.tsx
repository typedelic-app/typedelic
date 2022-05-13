import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 9999999999;
  #resized-area {
    width: 650px;
    max-width: 100%;
    min-width: 380px;
    height: 85vh;
    min-height: 200px;
    resize: both;
    outline: 1px;
    padding: 0 5px 0px 5px;
    position: relative;
    overflow: hidden;
    &:after,
    &:before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      transform: rotate(45deg);
      border-right: 1px solid rgba(255, 255, 255, 0.8);
      z-index: 9999999999;
      right: -1px;
      bottom: -1px;
    }
    &:before {
      right: 1px;
      bottom: 1px;
    }
    .preview-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      width: 100%;
      height: 50px;
      .buttons {
        display: flex;
        button {
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 4px 15px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.2);
          font-weight: 600;
          font-size: 0.8rem;
          transition: 0.2s ease;
          margin-left: 5px;
          margin-bottom: 5px;
          i {
            margin-right: 7px;
          }
          &:hover {
            background: var(--primary);
            color: var(--background);
          }
          &.loading {
            display: inline-block;
            background: var(--background);
            color: var(--text);
            cursor: no-drop;
            &:hover {
              background: var(--background);
              color: var(--text);
            }
          }
          .download-icon {
            font-size: 12px;
            margin-bottom: 2px;
            &.active {
              display: none;
            }
          }
        }
      }
    }
    .scroll-area {
      width: 100%;
      height: calc(100% - 50px);
      /* margin-bottom: 50px; */
      overflow-x: hidden;
      overflow-y: scroll;
      background: var(--background);
      #output-area {
        background: var(--background);
        min-height: 100%;
        margin: 0;
        padding: 0;
      }
    }
  }
  .loading-icon {
    opacity: 0.7;
    animation: ${loading} 1.5s infinite linear;
    margin-left: 5px;
    margin-bottom: 3px;
    margin-right: 0 !important;
    display: none;
    &.active {
      display: inline-block;
    }
  }
  .label {
    background: var(--background);
    color: #fff;
    font-weight: 600;
    width: 140px;
    font-size: 0.85rem;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  }
  .copy-button,
  .download {
    display: none !important;
  }
`;

export default Wrapper;
