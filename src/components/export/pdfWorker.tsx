import React from 'react';
import Wrapper from './outputStyle';
const ipc = require('electron').ipcRenderer;

const pdfWorker = () => {
  ipc.on('printPDF', (event: any, content: any) => {
    const output: any = document.getElementById('output');
    output.innerHTML = content;
  });
  return (
    <Wrapper>
      <div id="output" />
    </Wrapper>
  );
};

export default pdfWorker;
