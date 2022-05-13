import styled from 'styled-components';

export const TagWrapper = styled.span`
  display: flex;
  align-items: center;
  padding: 4px 10px;
  padding-left: 18px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease background;
  font-weight: 400;
  input {
    margin: 0;
    padding: 0;
    font-size: 13px;
    width: calc(100% - 10px);
  }
  &:before {
    content: '#';
    font-weight: 600;
    opacity: 0.3;
    font-size: 1.2em;
    padding-right: 5px;
  }
  .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 5px;
  }
  .count {
    margin-left: auto;
    font-weight: 400;
  }
  &:hover {
    background: var(--editorbg);
  }
  &.active {
    background: var(--editorbg);
    border-left: 3px solid var(--primary);
    padding-left: 15px;
    color: var(--primary);
    &:before {
      opacity: 0.8;
    }
    span {
      font-weight: 600;
    }
  }
`;

export const TaglistWrapper = styled.div`
  margin-top: 0px;
  h2 {
    cursor: auto;
    .icon {
      font-size: 0.83em;
      margin-left: -0.15em;
      margin-right: -0.15em;
    }
    &:hover {
      background: rgba(0, 0, 0, 0);
    }
  }
  .tags {
    width: 100%;
  }
`;
