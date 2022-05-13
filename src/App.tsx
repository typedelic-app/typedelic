import React from 'react';
import Layout from './components/layout';
import Loading from './components/elements/loading';
import { Provider } from 'react-redux';
import configureStore from './store';

// global styling //
import './App.global.scss';
import GlobalStyle from './styles/GlobalStyle';
import GlobalWorkerStyle from './components/export/GlobalWorkerStyle';
import Color from './styles/Colors';
import PdfWorker from './components/export/pdfWorker';

// codemirror //
require('codemirror/keymap/sublime');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/mode/php/php');
require('codemirror/mode/ruby/ruby');
require('codemirror/mode/sql/sql');
require('codemirror/mode/css/css');
require('codemirror/mode/sass/sass');
require('codemirror/mode/jsx/jsx');
require('codemirror/mode/python/python');
require('codemirror/mode/xml/xml');
require('codemirror/mode/go/go');
require('codemirror/mode/clike/clike');
require('codemirror/mode/dockerfile/dockerfile');
require('codemirror/mode/shell/shell');
require('codemirror/mode/yaml-frontmatter/yaml-frontmatter');
require('codemirror/mode/gfm/gfm');
require('codemirror/addon/edit/continuelist');
require('codemirror/addon/edit/closebrackets');
require('codemirror/addon/display/placeholder');

const Store = configureStore();

export default function App(props: any) {
  const { root } = props;
  return (
    <Provider store={Store}>
      {root ? <Layout /> : <PdfWorker />}
      {root ? <Loading /> : ''}
      <Color />
      {root ? <GlobalStyle /> : <GlobalWorkerStyle />}
    </Provider>
  );
}
