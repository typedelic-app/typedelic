import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';
import { AppState } from '../../types';

const bounce = keyframes`
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  } 100% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  .spinner {
    width: 40px;
    height: 40px;
    margin: 100px auto;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 100%;
    -webkit-animation: ${bounce} 1s infinite ease-in-out;
    animation: ${bounce} 1s infinite ease-in-out;
  }
  &.hidden {
    display: none;
  }
`;

const Spin = () => {
  const loading = useSelector((state: AppState) => state.view.loading);
  return (
    <Wrapper className={loading ? '' : 'hidden'}>
      <div className="spinner" />
    </Wrapper>
  );
};

export default Spin;
