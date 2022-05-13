import React, { useState, useEffect, createRef, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from './style';
import * as Comlink from 'comlink';
// @ts-ignore
import MyWorker from '../../workers/main.worker';
const worker = new MyWorker();
const comlinked: any = Comlink.wrap(worker);
import Code from './blocks/code';
import Md from './blocks/md';

const Preview = () => {
  const dispatch = useDispatch();
  const editor = useSelector((state: any) => state.editor);
  const [parsed, setParsed] = useState(['']);
  const [blocks, setBlocks]: any = useState([]);
  const preview: any = createRef();

  async function compile() {
    await comlinked.markdown.compile(editor.markdown, editor.line);
    const data = await comlinked.markdown.compiled;
    await setParsed(data);
    setBlocks(await comlinked.markdown.blocks);
  }

  async function reset() {
    await dispatch({
      type: 'SET_CLICKED_LINE',
      clickedLine: 0,
    });
  }

  useEffect(() => {
    reset();
    preview.current.scrollTo(0, 0);
  }, [editor.path]);

  useEffect(() => {
    compile();
  }, [editor.markdown]);

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      if (preview.current) {
        const focused = preview.current.querySelector(`#line-${editor.line}`);
        if (focused) {
          const top = preview.current.scrollTop;
          const bottom =
            preview.current.scrollTop + document.body.clientHeight - 90;
          const targetRect = focused.getBoundingClientRect().top + top - 90;
          if (!(targetRect >= top && targetRect <= bottom)) {
            focused.scrollIntoView({
              block: 'start',
            });
          }
        }
      }
    });
  }, [editor.markdown, editor.line]);

  return (
    <Wrapper id="preview" ref={preview}>
      <div className="preview__contents">
        {parsed.map((e: string, key: number) => {
          return (
            <>
              <Md key={`md-${key}`} value={e} />
              {blocks.length !== 0 && blocks[key] ? (
                <Code
                  key={`$code-${key}`}
                  id={blocks[key].id}
                  value={blocks[key].value}
                  lang={blocks[key].lang}
                  meta={blocks[key].meta}
                  position={blocks[key].position}
                />
              ) : (
                ''
              )}
            </>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Preview;
