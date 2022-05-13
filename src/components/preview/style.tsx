import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: scroll;
  font-family: var(--font-family);
  background: var(--background);
  letter-spacing: 0.02em;
  font-size: 14px;
  line-height: 1.9;
  overflow-wrap: break-word;
  position: relative;
  .preview__contents {
    padding: 0px 10px 10px 10px;
    width: 100%;
    max-width: 100%;
    #line-1 {
      margin-top: 10px;
    }
  }
  p {
    width: 100%;
    max-width: 100%;
    margin: 15px 0;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
    line-height: 1;
    color: var(--primary);
    min-height: 1.3em;
    max-width: 100%;
    cursor: pointer;
    transition: 0.2s ease;
    &:hover {
      opacity: 0.8;
    }
  }
  h1,
  h2 {
    font-size: 20px;
    line-height: 1.4;
    border-bottom: 1px solid var(--primary);
    margin: 30px 0 20px 0;
    padding: 5px 0px 5px 25px;
    position: relative;
    min-height: 21px;
    &:before {
      font-size: 11px;
      content: 'H1';
      position: absolute;
      top: 0.65rem;
      bottom: 0;
      left: 0;
      margin: auto;
      opacity: 0.7;
    }
  }
  h2 {
    font-size: 18px;
    min-height: 18px;
    &:before {
      content: 'H2';
    }
  }
  h3,
  h4,
  h5,
  h6 {
    font-size: 16px;
    line-height: 1.5;
    margin: 20px 0 20px 0;
    position: relative;
    padding-left: 23px;
    min-height: 1em;
    &:before {
      font-size: 10px;
      content: 'H3';
      top: 0.3rem;
      position: absolute;
      left: 0;
      opacity: 0.7;
    }
  }
  h4 {
    font-size: 15px;
    &:before {
      content: 'H4';
    }
  }
  h5 {
    font-size: 14px;
    &:before {
      content: 'H5';
      top: 0.2rem;
    }
  }
  h6 {
    font-size: 14px;
    &:before {
      content: 'H6';
      top: 0.2rem;
    }
  }
  hr {
    outline: none;
    border: none;
    margin: 30px 0;
    border-top: 2px dashed rgba(255, 255, 255, 0.25);
  }
  a {
    color: var(--third);
  }
  code {
    display: inline-block;
    color: var(--third);
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.09);
    line-height: 1;
    padding: 3px 7px;
    margin: 0 3px;
    border-radius: 1px;
    max-width: 100%;
  }
  img {
    height: auto;
    /* margin: 20px 0; */
    max-width: 100%;
  }
  span.checkbox {
    display: inline-block;
    width: 14px;
    height: 14px;
    background: rgba(255, 255, 255, 0.3);
    position: relative;
    position: absolute;
    top: 10px;
    left: 0px;
    &:before {
      content: '';
      position: absolute;
      border-top: 2px solid var(--editorbg);
      border-right: 2px solid var(--editorbg);
      width: 10px;
      height: 6px;
      left: 2px;
      top: 3px;
      transform: rotate(135deg);
      opacity: 0;
    }
    &.checked {
      background: var(--primary);
      &:before {
        opacity: 1;
      }
    }
  }
  ol,
  ul {
    margin: 20px 0px;
    max-width: 100%;
    li,
    .task-list-item {
      margin: 0;
      padding: 5px 0;
      padding-left: 25px;
      line-height: 1.8;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      list-style: none;
      position: relative;
      min-height: 30px;
      ul,
      ol {
        margin: 5px 0;
      }
      &:last-child {
        border-bottom: 0;
      }
      p {
        padding: 0;
        margin: 0;
        display: inline;
      }
      &:last-child {
        padding-bottom: 0;
      }
    }
  }
  ul {
    li {
      padding-left: 16px;
      &:before {
        content: '';
        width: 4px;
        height: 4px;
        display: inline-block;
        margin-right: 10px;
        background: var(--primary);
        border-radius: 50%;
        position: absolute;
        top: 15px;
        left: 3px;
      }
      &.task-list-item {
        list-style: none;
        padding-left: 10px;
        padding-left: 27px;
        &:before {
          display: none;
        }
        input[type='checkbox'] {
          appearance: none;
          -webkit-appearance: none;
          outline: none;
          display: inline-block;
          position: relative;
          border-radius: 2px;
          background-color: rgba(0, 0, 0, 0);
          cursor: pointer;
          color: #515151;
          position: absolute;
          left: 15px;
          top: 18px;
        }
        input[type='checkbox']::before {
          content: '';
          position: absolute;
          width: 15px;
          height: 15px;
          top: calc(50% - 10px);
          left: -10px;
          display: block;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 2px;
        }
        /* checkbox チェックマーク */
        input[type='checkbox']::after {
          content: '';
          position: absolute;
          width: 7px;
          height: 11px;
          left: -6px;
          top: calc(50% - 9px);
          border-right: 3px solid var(--editorbg);
          border-bottom: 3px solid var(--editorbg);
          transform: rotate(45deg);
          display: block;
          opacity: 0;
        }
        input[type='checkbox']:checked {
          background-color: var(--editorbg);
        }
        input[type='checkbox']:checked::before {
          background-color: var(--primary);
        }
        input[type='checkbox']:checked::after {
          opacity: 1;
        }
      }
      ol,
      ul {
        padding-left: 15px;
      }
    }
  }
  ol {
    counter-reset: section;
    list-style-type: none;
    li {
      padding-left: 0;
      &:before {
        counter-increment: section;
        content: counters(section, '-') '. ';
        font-weight: 600;
        font-family: 'Times New Roman';
        font-style: italic;
        color: var(--primary);
        letter-spacing: 0.05rem;
        text-align: right;
        margin-right: 2px;
      }
      ol,
      ul {
        li,
        li.task-list-item {
          padding-left: 20px;
        }
      }
    }
  }

  blockquote {
    position: relative;
    margin: 15px 0;
    padding: 15px 10px 15px 12px;
    border-left: 2px solid var(--primary);
    background: rgba(255, 255, 255, 0.05);
    line-height: 1.7;
    max-width: 100%;
    p,
    div,
    ul,
    ol {
      margin: 0 !important;
      padding: 0 !important;
    }
  }
  table {
    width: 100%;
    display: inline-block;
    overflow-x: scroll;
    background: rgba(255, 255, 255, 0);
    font-size: 0.95em;
    margin: 10px 0;
    tbody {
      background: rgba(255, 255, 255, 0.1);
    }
    tr {
      width: 100%;
      td,
      th {
        border: 1px solid var(--background);
        padding: 5px 10px;
        min-width: 100px;
      }
      th {
        font-weight: 600;
        background: rgba(255, 255, 255, 0.7);
        color: var(--background);
      }
      &:nth-child(even) {
        background: rgba(255, 255, 255, 0.05);
      }
    }
  }
  ::selection {
    background: var(--select2);
  }
  ::-moz-selection {
    background: var(--select2);
  }
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-left: 1px solid rgba(255, 255, 255, 0);
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
    border-left: solid 1px rgba(255, 255, 255, 0);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0px;
    box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0);
  }
`;

export default Wrapper;
