import styled from 'styled-components';

export const NotesBarWrapper = styled.div`
  background: var(--background);
  width: 100%;
  height: 100%;
  user-select: none;
  border-right: 1px solid var(--border);
  .inner {
    width: 100%;
    height: 100%;
  }
  .header {
    height: 90px;
  }
  .header-area {
    padding: 15px 10px 10px 10px;
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 1.1em;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: calc(100% - 30px);
    }
    button {
      cursor: pointer;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 22px;
      font-size: 0.7em;
      border-radius: 50%;
      border-radius: 3px;
      color: #fff;
      transition: 0.2s ease;
      &:hover {
        background: var(--primary);
        color: var(--editorbg);
      }
    }
  }
  .note-list {
    height: calc(100% - 115px);
    overflow-y: scroll;
    .note-list-inner {
      min-height: 100%;
    }
  }
  .no-files {
    width: 100%;
    height: 100%;
    font-size: 1.4em;
    text-align: center;
    opacity: 0.4;
    font-weight: 600;
    width: 100%;
    height: calc(100vh - 200px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const NoteWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px 12px;
  font-size: 0.85em;
  cursor: pointer;
  transition: 0.2s ease background;
  h2 {
    font-size: 1.1em;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  p {
    opacity: 0.7;
    font-size: 12px;
    padding: 6px 0 6px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: 0.75;
    .tags {
      display: flex;
      .tag {
        font-size: 10px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.08);
        margin-left: 4px;
        padding: 1px 8px;
        color: var(--text);
      }
    }
    .date {
      font-size: 12px;
      color: var(--text);
    }
  }
  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }
  &.active {
    border-left: 2px solid var(--primary);
    padding-left: 10px;
    background: rgba(0, 0, 0, 0.15);
    color: var(--primary);
    p,
    .date {
      color: var(--primary);
    }
  }
  &.drag {
    opacity: 0.5;
    p {
      opacity: 0;
    }
    .bottom {
      opacity: 0;
    }
  }
`;

export const Progress = styled.span`
  display: flex;
  align-items: center;
  margin-left: auto;
  .count {
    font-size: 11px;
    font-weight: 600;
    margin-right: 7px;
    letter-spacing: 0;
    color: ${(props: any) =>
      props.percent === 100 ? 'var(--primary) ' : 'var(--text)'};
  }
  &.active {
    .count {
      color: var(--primary);
    }
  }
`;

export const ProgressBar = styled.span`
  display: inline-block;
  width: 60px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  position: relative;
  border-radius: 3px;
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    height: 4px;
    left: 0;
    background: ${(props: any) =>
      props.percent === 100 ? 'var(--primary) ' : 'var(--text)'};
    width: ${(props: any) => props.percent}%;
  }
  &.active {
    &:before {
      background: var(--primary);
    }
  }
`;
