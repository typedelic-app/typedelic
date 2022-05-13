import React, { useEffect, useLayoutEffect, createRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import store from '../../storage/storage';
import { Controlled as CodeMirror } from './react-codemirror';
import Wrapper from './style';
import flowSyntax from './syntax/flowSyntax';
import seqSyntax from './syntax/seqSyntax';
import umlSyntax from './syntax/umlSyntax';
import mermaidSyntax from './syntax/mermaidSyntax';
import api from '../../api';
import { AppState } from '../../types';
import scroll from './scroll';

const Editor = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: AppState) => state);
  const markdown = useSelector((state: AppState) => state.editor.markdown);
  const path = useSelector((state: any) => state.editor.path);
  const editor: any = createRef();
  const trashPath: string = store.get('workspace.trashboxPath');

  const isTrash = useMemo(() => {
    if (state.editor.path !== '') {
      const dir = state.editor.path.slice(0, trashPath.length);
      return dir === trashPath;
    } else return false;
  }, [state.editor.path]);

  useLayoutEffect(() => {
    if (state.editor.clickedLine !== 0) {
      scroll(editor, state.editor.clickedLine);
    }
  }, [state.editor.clickedLine]);

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: 'SET_MARKDOWN',
        markdown: markdown,
        line: 0,
      });
    }, 10);
    if (editor) {
      editor.current.editor.scrollTo(0, 0);
    }
  }, [path]);

  function onDoubleClick(editor: any) {
    if (editor.doc.sel.ranges[0]) {
      const line = editor.doc.sel.ranges[0].anchor.line;
      dispatch({
        type: 'SET_CURRENT_LINE',
        line: line + 1,
      });
      setTimeout(() => {
        dispatch({
          type: 'SET_CURRENT_LINE',
          line: 0,
        });
      }, 200);
    }
  }

  function onChange(_editor: any, data: any, value: string) {
    dispatch({
      type: 'SET_MARKDOWN',
      markdown: value,
      line: data.from.line + 1,
    });
    setTimeout(() => {
      api.saveFile(path, value);
    }, 10);
  }

  return (
    <Wrapper>
      <CodeMirror
        value={markdown}
        ref={editor}
        options={{
          mode: 'yaml-frontmatter',
          lineNumbers: true,
          lineWrapping: true,
          tabSize: 2,
          fencedCodeBlockHighlighting: true,
          autoCloseBrackets: true,
          autoRefresh: true,
          extraKeys: {
            Enter: 'newlineAndIndentContinueMarkdownList',
            Tab: 'autoIndentMarkdownList',
            'Shift-Tab': 'autoUnindentMarkdownList',
          },
          placeholder: 'Start writing ...',
          readOnly: isTrash ? true : false,
        }}
        onDblClick={(editor, _event) => {
          onDoubleClick(editor);
        }}
        onBeforeChange={(editor, data, value) => {
          onChange(editor, data, value);
        }}
        editorDidMount={(editor, _event) => {
          editor.refresh();
        }}
        defineMode={[
          { name: 'flow', fn: flowSyntax },
          { name: 'flowchart', fn: flowSyntax },
          { name: 'sequence', fn: seqSyntax },
          { name: 'uml', fn: umlSyntax },
          { name: 'plantuml', fn: umlSyntax },
          { name: 'mermaid', fn: mermaidSyntax },
        ]}
      />
    </Wrapper>
  );
};

export default Editor;
