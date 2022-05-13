import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getDirectoryName } from '../../../api/utils';

const Folder = () => {
  const dispatch = useDispatch();
  const editor = useSelector((state: any) => state.editor);
  const fullPath = getDirectoryName(editor.path);
  const folderName = getDirectoryName(editor.path).split('/').pop();
  const onClick = () => {
    if (folderName !== '') {
      dispatch({
        type: 'SET_SELECTED_FOLDER',
        title: folderName,
        selectedFolder: { folderName, path: fullPath },
      });
    }
  };
  return (
    <Wrapper className="folder" onClick={onClick}>
      <i className="fas fa-folder"></i>
      <span>{folderName}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 5px;
  margin-right: 10px;
  font-weight: 400;
  opacity: 0.7;
  white-space: nowrap;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    opacity: 0.5;
  }
  i {
    margin-right: 5px;
  }
  span {
    white-space: nowrap;
  }
`;

export default Folder;
