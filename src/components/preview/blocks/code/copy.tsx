/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';

function CopyButton({
  bg = '' as string,
  color = '' as string,
  value = '' as string,
}): JSX.Element {
  const [active, setActive] = useState(false);
  const copy = () => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 1000);
  };
  return (
    <Wrapper bg={bg} color={color} className="copy-button">
      <CopyToClipboard text={value} onCopy={copy}>
        <button type="button" className={`copy ${active ? 'active' : ''}`}>
          <i className="fas fa-paste" />
        </button>
      </CopyToClipboard>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  transition: 0.2s ease;
  opacity: 1;
  button {
    position: absolute;
    top: 1px;
    right: 1px;
    cursor: pointer;
    font-size: 1em;
    color: ${(props: { color: string }) => props.color || `var(--text)`};
    opacity: 0.4;
    z-index: 99999;
    width: 31px;
    height: 31px;
    background: rgba(0, 0, 0, 0.6);
    &:before {
      content: 'COPIED';
      position: absolute;
      font-size: 11px;
      height: 0.8em;
      top: -0.6em;
      bottom: 0;
      left: -75px;
      margin: auto;
      width: 100px;
      text-align: center;
      font-weight: 600;
      letter-spacing: 0.02em;
      opacity: 0;
      visibility: hidden;
      transform: translateX(10px);
      transition: 0.2s ease;
      color: var(--primary);
    }
    &:hover {
      opacity: 1;
    }
    &.active {
      color: var(--primary);
      opacity: 1;
      &:before {
        opacity: 1;
        visibility: visible;
        transform: translateX(0px);
      }
    }
  }
`;

export default CopyButton;
