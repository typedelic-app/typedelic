import styled from 'styled-components';

export const ArrowIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 18px;
  position: absolute;
  left: -22px;
  top: 0;
  bottom: 3px;
  margin: auto;
  display: inline-block;
  cursor: pointer;
  z-index: 9999;
  span {
    border-top: 2px solid rgba(255, 255, 255, 0.4);
    border-right: 2px solid rgba(255, 255, 255, 0.4);
    width: 7px;
    height: 7px;
    top: 0;
    bottom: ${(props: any) => (props.isOpen ? '5px' : '0')};
    left: 0px;
    right: 0;
    margin: auto;
    position: absolute;
    transition: 0.2s ease;
    transform: ${(props: any) =>
      props.isOpen ? 'rotate(135deg)' : 'rotate(45deg)'};
    z-index: 99999;
  }
  &:hover {
    span {
      border-top: 2px solid var(--primary);
      border-right: 2px solid var(--primary);
    }
  }
`;

export const ListWrapper = styled.li`
  line-height: 1.4;
  transition: 0.2s ease background;
  padding-left: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  .list-inner {
    position: relative;
    list-style: none;
    width: calc(
      100% - ${(props: { depth: number }) => (props.depth + 1) * 10}px
    );
    margin-left: ${(props: { depth: number }) => (props.depth + 1) * 10}px;
  }
  .list-name {
    display: inline-block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
    margin-bottom: -4px;
    padding: 0;
    padding: 6px 0 6px 0;
    font-weight: 400;
  }
  input {
    line-height: 1;
    padding: 0;
    font-size: 13px;
  }
  &.hover,
  &:hover {
    background: var(--editorbg);
  }
  &.active {
    background: var(--editorbg);
    color: var(--primary);
    border-left: 3px solid var(--primary);
    padding-left: 7px;
    span {
      font-weight: 600;
    }
  }
`;

export const TreeWrapper = styled.ul`
  width: 100%;
  font-size: 14px;
  .accordion {
    &.open {
      display: block;
    }
    &.close {
      display: none;
    }
  }
  .tree {
    display: none;
    width: 100%;
    &.open {
      display: block;
    }
  }
`;

export const SidebarWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: var(--background);
  border-right: 1px solid var(--border);
  user-select: none;
  h2 {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 100%;
    transition: 0.2s ease;
    padding-left: 6px;
    transition: 0.2s ease background;
    position: relative;
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: auto;
      width: 24px;
      height: 20px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
      padding-top: 1px;
      font-size: 0.7em;
      cursor: pointer;
      transition: 0.2s ease background;
      position: absolute;
      top: 7px;
      right: 7px;
      z-index: 9999;
      &:hover {
        background: var(--primary);
        color: var(--background);
      }
    }
    span {
      font-size: 1em;
      margin-top: 1px;
      width: calc(100% - 50px);
      padding: 5px 5px 8px 7px;
    }
    .icon {
      padding-left: 3px;
      padding-bottom: 2px;
      opacity: 0.4;
      font-size: 0.88em;
    }
    &:hover,
    &.hover {
      background: var(--editorbg);
    }
    &.active {
      background: var(--editorbg);
      border-left: 3px solid var(--primary);
      color: var(--primary);
      i {
        opacity: 1;
      }
    }
  }
  .sidebar-content {
    height: calc(100% - 40px);
    padding-bottom: 10px;
    overflow-y: scroll;
  }
  .inner {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.03);
    padding: 0px;
  }
`;
