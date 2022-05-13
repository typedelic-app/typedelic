import React from 'react';
import styled from 'styled-components';
const { dialog } = require('electron').remote;
const req = require('request');
const fs = require('fs-extra');

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 9999;
  font-size: 0.9em;
  color: ${(props: { color: string }) => props.color || `var(--text)`};
  opacity: 0.4;
  z-index: 99999;
  width: 31px;
  height: 31px;
  background: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  opacity: 0;
  transition: 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Download = (props: any) => {
  const handleOnClick = () => {
    if (props.type === 'svg') {
      const saveDialog = dialog.showSaveDialog(null, {
        title: 'Save',
        defaultPath: '.',
        filters: [{ name: 'SVG Image', extensions: ['svg'] }],
      });
      saveDialog.then((e: any) => {
        if (!e.canceled) {
          fs.writeFileSync(e.filePath, props.value);
        }
      });
    } else if (props.type === 'png') {
      const saveDialog = dialog.showSaveDialog(null, {
        title: 'Save',
        defaultPath: '.',
        filters: [{ name: 'PNG Image', extensions: ['png'] }],
      });
      saveDialog.then((e: any) => {
        if (!e.canceled) {
          req({ method: 'GET', url: props.value, encoding: null }, function (
            error: any,
            response: any,
            body: any
          ) {
            if (!error && response.statusCode === 200) {
              fs.writeFileSync(e.filePath, body, 'binary');
            }
          });
        }
      });
    }
  };
  return (
    <Wrapper onClick={handleOnClick} className="download">
      <i className="fas fa-download" />
    </Wrapper>
  );
};

export default Download;
