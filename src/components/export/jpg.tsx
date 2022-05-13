import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../api';
import { AppState } from '../../types';
import Preview from '../preview';
import Wrapper from './style';

const ExportJpg = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: AppState) => state);
  const [loading, setLoading] = useState(false);

  function close() {
    dispatch({
      type: 'SET_IMAGE_PREVIEW_MODE',
      imagePreviewMode: false,
    });
  }

  function save() {
    setLoading(true);
    api.exportAsJpg(state, close).then(() => {
      setLoading(false);
    });
  }

  if (state.view.imagePreviewMode) {
    return (
      <Wrapper>
        <div id="resized-area">
          <div className="preview-header">
            <div className="label">Preview</div>
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
                {`${loading ? 'Loading' : 'Save Image'}`}
                <i
                  className={`fas fa-solid fa-spinner loading-icon ${
                    loading ? 'active' : ''
                  }`}
                />
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

export default ExportJpg;
