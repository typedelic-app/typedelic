import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { themes } from '../../../styles/Colors';
import store from '../../../storage/storage';

const ColorSwitch = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  const setColor = (color: string) => {
    setActive(false);
    store.set('view.color', color);
    dispatch({
      type: 'SET_COLOR',
      color,
    });
  };
  return (
    <Wrapper className="color-switch">
      <div className="palette" onClick={handleClick} />
      <ul className={`palette-menu ${active ? 'active' : ''}`}>
        {themes.map((theme) => {
          return (
            <li key={theme.key} onClick={() => setColor(theme.key)}>
              {theme.name}
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 18px;
  height: 18px;
  font-size: 0.8em;
  position: relative;
  .palette {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: var(--primary);
    cursor: pointer;
  }
  .palette-menu {
    width: 130px;
    position: absolute;
    top: 28px;
    right: -7px;
    transition: 0.2s ease;
    opacity: 0;
    visibility: hidden;
    background: var(--background);
    border: 1px solid rgba(255, 255, 255, 0.15);
    z-index: 9999999;
    &.active {
      opacity: 1;
      visibility: visible;
    }
    li {
      list-style: none;
      padding: 10px;
      cursor: pointer;
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
      font-weight: 600;
      &:last-child {
        border-bottom: 0;
      }
      &:hover {
        color: var(--primary);
        background: var(--editorbg);
      }
    }
  }
`;

export default ColorSwitch;
