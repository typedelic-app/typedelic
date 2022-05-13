/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable react/destructuring-assignment */
import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import Wrapper from './style';
import Copy from './copy';
import Sequence from '../sequence';
import Flowchart from '../flowchart';
import Mermaid from '../mermaid';
import Uml from '../uml';
import { AppState } from '../../../../types';

const Memoed = React.memo<{ props: any }>(({ props }) => {
  const { id, value, position, meta, lang } = props;
  const dispatch = useDispatch();
  const editor = useSelector((state: AppState) => state.editor);
  useEffect(() => {
    if (editor.line === 0) return;
    const line = id.split('-')[1];
    dispatch({
      type: 'SET_CURRENT_LINE',
      line: Number(line),
    });
  }, [value]);
  let mode = lang;
  if (mode === 'html') mode = 'xml';
  else if (mode === 'mermaid')
    return <Mermaid id={id} meta={meta} value={value} />;
  else if (mode === 'flow' || mode === 'flowchart') {
    return <Flowchart id={id} meta={meta} value={value} />;
  } else if (mode === 'sequence') {
    return <Sequence id={id} meta={meta} value={value} />;
  } else if (mode === 'uml' || mode === 'plantuml') {
    return <Uml id={id} meta={meta} value={value} />;
  }

  return (
    <Wrapper className={meta !== '' ? 'includeMeta' : ''} id={id}>
      {meta !== '' ? <span className="meta">{meta}</span> : ''}
      <CodeMirror
        value={value}
        options={{
          mode: mode,
          theme: 'monokai',
          lineNumbers: false,
          lineWrapping: false,
          tabSize: 2,
          readOnly: true,
          startOpen: true,
        }}
        editorDidMount={(e) => {
          e.refresh();
        }}
      />
      <Copy value={value} />
    </Wrapper>
  );
});

const CodeBlock = (props: any) => {
  const memoedProps = useMemo(() => {
    let mode;
    if (props.lang === 'sh' || props.lang === 'bash') mode = 'shell';
    else if (
      props.lang === 'js' ||
      props.lang === 'ts' ||
      props.lang === 'typescript'
    )
      mode = 'javascript';
    else if (props.lang === 'java') mode = 'clike';
    else mode = props.lang;
    return { id: props.id, value: props.value, lang: mode, meta: props.meta };
  }, [props.value, props.lang, props.meta]);
  return <Memoed props={memoedProps} />;
};

export default CodeBlock;
