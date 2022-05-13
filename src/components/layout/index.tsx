import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../api';
import SplitPane from 'react-split-pane';
import Wrapper from './style';
import Content from '../content';
import Sidebar from '../sidebar';
import Notes from '../notes';
import { AppState } from '../../types';
import ExportJpg from '../export/jpg';
import ExportPdf from '../export/pdf';

const Layout = () => {
  const dispatch = useDispatch();
  const workspace = useSelector((state: AppState) => state.workspace);
  const loading = useSelector((state: AppState) => state.view.loading);

  const [sidebarWidth, setSidebarWidth] = useState(165);
  const [notebarWidth, setNotebarWidth] = useState(250);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    api
      .getAllNotes(workspace.path)
      .then((e: any) => {
        if (e) {
          dispatch({
            type: 'SET_WORKSPACE',
            path: workspace.path,
            allFolders: e.folders,
          });
        }
      })
      .then(() => {
        setTimeout(() => {
          dispatch({
            type: 'SET_LOADING',
            loading: false,
          });
        }, 500);
      });

    const listener = () => {
      setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 0);
    };
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, []);

  const onChangeSidebar = (e: any) => {
    setTimeout(() => {
      setSidebarWidth(e);
    }, 0);
  };

  const onChangeNoteBar = (e: any) => {
    setTimeout(() => {
      setNotebarWidth(e);
    }, 0);
  };

  useEffect(() => {
    setTimeout(() => {
      setWidth(windowWidth - (sidebarWidth + notebarWidth));
    }, 10);
  }, [sidebarWidth, notebarWidth, windowWidth]);

  return (
    <Wrapper className={loading ? '' : 'loaded'}>
      <SplitPane
        split="vertical"
        minSize={150}
        maxSize={400}
        defaultSize={sidebarWidth}
        onDragFinished={(e) => onChangeSidebar(e)}
        onChange={(e) => onChangeSidebar(e)}
      >
        <Sidebar />
        <SplitPane
          split="vertical"
          minSize={210}
          maxSize={500}
          defaultSize={notebarWidth}
          onDragFinished={(e) => onChangeNoteBar(e)}
          onChange={(e) => onChangeNoteBar(e)}
        >
          <Notes />
          <Content width={width} />
        </SplitPane>
      </SplitPane>
      <ExportJpg />
      <ExportPdf />
    </Wrapper>
  );
};

export default Layout;
