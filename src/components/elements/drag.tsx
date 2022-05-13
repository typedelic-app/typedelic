import React from 'react';
import styled from 'styled-components';

const Drag = (props: { width?: string; height?: string; children?: any }) => {
  const { width, height, children } = props;
  return (
    <Wrapper width={width} height={height}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: ${(props: any) => props.width};
  height: ${(props: any) => props.height};
  -webkit-app-region: drag;
`;

export default Drag;
