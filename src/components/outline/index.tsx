import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from './style';
import * as Comlink from 'comlink';
// @ts-ignore
import MyWorker from '../../workers/main.worker';
const worker = new MyWorker();
const comlinked: any = Comlink.wrap(worker);

const Outline = () => {
  const editor = useSelector((state: any) => state.editor);
  const dispatch = useDispatch();
  const [outline, setOutline] = useState([]);

  async function compile() {
    await comlinked.markdown.compileOutline(editor.markdown, editor.line);
    const tempOutline = await comlinked.markdown.outline;
    await setOutline(tempOutline);
  }

  async function reset() {
    await dispatch({
      type: 'SET_CLICKED_LINE',
      clickedLine: 0,
    });
    compile();
  }

  useEffect(() => {
    reset();
  }, [editor.path]);

  useEffect(() => {
    compile();
  }, [editor.markdown]);

  function onClick(e: any) {
    dispatch({
      type: 'SET_CLICKED_LINE',
      clickedLine: e.line,
    });
    setTimeout(() => {
      dispatch({
        type: 'SET_CLICKED_LINE',
        clickedLine: 0,
      });
    }, 100);
  }

  return (
    <Wrapper className="outline">
      {outline.map((e: any) => {
        return (
          <li
            key={e.line}
            onClick={() => onClick(e)}
            className={`depth-${e.depth}`}
          >
            {e.children[0] ? e.children[0].value : ''}
          </li>
        );
      })}
    </Wrapper>
  );
};

export default Outline;
