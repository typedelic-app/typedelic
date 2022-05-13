import React from 'react';
import styled from 'styled-components';
import Download from './download';

export const ErrorWrapper = styled.span`
  width: 100%;
  display: inline-block;
  border: 1px solid var(--primary);
  color: var(--primary);
  font-size: 0.9em;
  padding: 10px;
  text-align: center;
  margin: 10px 0;
`;

const Wrapper = styled.div`
  max-width: 100%;
  margin: 10px 0;
  overflow: auto;
  background: var(--editorbg);
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .svg-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 100% !important;
      height: auto !important;
    }
  }
  img {
    max-width: 100%;
    padding: 0 10px;
  }
  &:before {
    content: ${(props: any) => {
      props.meta;
    }};
  }
  &.includesMeta {
    padding-top: 25px;
  }
  .meta {
    position: absolute;
    top: 0px;
    left: 0;
    background: rgba(255, 255, 255, 0.1);
    color: var(--text);
    font-size: 0.8em;
    padding: 0px 15px;
    position: absolute;
    z-index: 99999;
    font-family: var(--font-family);
  }
  &:hover {
    .download {
      opacity: 0.4;
    }
  }
`;

const DiagramWrapper = (props: any) => {
  return (
    <Wrapper
      id={props.id}
      className={
        props.meta !== '' ? 'diagram-wrapper includesMeta' : 'diagram-wrapper'
      }
    >
      {props.meta !== '' ? <span className="meta">{props.meta}</span> : ''}
      {props.type ? <Download type={props.type} value={props.value} /> : ''}
      {props.children}
    </Wrapper>
  );
};

export default DiagramWrapper;
