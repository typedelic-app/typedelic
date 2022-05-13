import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../types';
import Preview from '../preview';
import Wrapper from './style';
const ipc = require('electron').ipcRenderer;
import api from '../../api';

const ExportPdf = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: AppState) => state);
  const [loading, setLoading] = useState(true);

  async function renderPdf() {
    let element: any = await document.getElementById('output-area');
    await ipc.send('printPDF', element.innerHTML);
  }

  useEffect(() => {
    setLoading(true);
    if (state.view.pdfPreviewMode) {
      setTimeout(() => {
        renderPdf();
      }, 2000);
      setTimeout(() => {
        setLoading(false);
      }, 4000);
    }
  }, [state.view.pdfPreviewMode]);

  function close() {
    ipc.send('closeWorkerWindow');
    dispatch({
      type: 'SET_PDF_PREVIEW_MODE',
      pdfPreviewMode: false,
    });
  }
  async function save() {
    setLoading(true);
    renderPdf();
    api.exportAsPdf(state).then(() => {
      setLoading(false);
    });
  }

  if (state.view.pdfPreviewMode) {
    return (
      <Wrapper>
        <div id="resized-area">
          <div id="btn-print-to-pdf" className="preview-header">
            <div className="label">PDF Preview</div>
            <div className="buttons">
              <button
                onClick={loading ? () => {} : save}
                className={`${loading ? 'loading' : ''}`}
              >
                <i
                  className={`fas fa-thin fa-download download-icon ${
                    loading ? 'active' : ''
                  }`}
                ></i>
                {`${loading ? 'Loading' : 'Save PDF'}`}
                <i
                  className={`fas fa-solid fa-spinner loading-icon ${
                    loading ? 'active' : ''
                  }`}
                ></i>
              </button>
              <button onClick={close}>Close</button>
            </div>
          </div>
          <div className="scroll-area">
            <div id="output-area">
              <Preview />
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
  return null;
};

export default ExportPdf;
