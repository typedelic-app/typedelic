import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Icon from './loadingIcon';
import { AppState } from '../../types';

const Loading = () => {
  const loading = useSelector((state: AppState) => state.view.loading);
  return (
    <Wrapper className={`${loading ? '' : 'hidden'}`}>
      <Icon />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: var(--background);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
  top: 0;
  left: 0;
  transition: 0.2s ease;
  &.hidden {
    opacity: 0;
    visibility: hidden;
  }
`;

export default Loading;
