import React from 'react';
import styled from 'styled-components';

const Modal = (props: { width?: string; height?: string; children?: any }) => {
  const { width, height, children } = props;
  return (
    <Wrapper width={width} height={height}>
      <div className="window">{children}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Modal;
