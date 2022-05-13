/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { css, createGlobalStyle } from 'styled-components';
import reset from '../../styles/reset';

/* ===============================================
#  font setting
=============================================== */

const font = css`
  font-family: 'Nunito', 'Segoe UI', 'Hiragino Kaku Gothic ProN',
    'Hiragino Sans', 'ヒラギノ角ゴ ProN W3', Arial, メイリオ, Meiryo, sans-serif;
  color: var(--text);
  word-wrap: break-word;
  word-break: break-all;
  -webkit-font-kerning: normal;
  font-kerning: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -moz-osx-font-smoothing: unset;
  text-rendering: auto;
  -webkit-text-stroke: 1px transparent;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  letter-spacing: 0.03em;
`;

/* ===============================================
#  global style
=============================================== */
const GlobalStyle = createGlobalStyle`
  ${reset}
  background: var(--background);
  html {
    background: var(--background);
  }
  body {
    ${font}
    font-size: 14px;
    line-height: 1.5;
    padding: 0;
    margin: 0;
    min-height: 100vh;
    position: relative;
    background: var(--background);
    width: 100vw;
    display: flex;
    a {
      color: var(--text);
    }
  }
  * {
    box-sizing: boreder-box;
    margin: 0;
    padding: 0;
  }
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
  }
  *:before, *:after {
    box-sizing: border-box;
  }
  input, button, textarea, button, select {
    ${font}
    border: none;
    outline: none;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    background: none;
    line-height: 1.5;
    font-size: 14px;
    &:focus {
      outline: none;
    }
    ::placeholder {
      color: rgba(255,255,255,0.3);
    }
  }
  #work {
    width: 100%;
  }
  :root {
    --code-font-family: 'FiraCode', 'Hiragino Kaku Gothic ProN',
    'Hiragino Sans', 'ヒラギノ角ゴ ProN W3', Arial, メイリオ, Meiryo, sans-serif;
    --font-family: 'Nunito', 'Segoe UI', 'Hiragino Kaku Gothic ProN',
    'Hiragino Sans', 'ヒラギノ角ゴ ProN W3', Arial, メイリオ, Meiryo, sans-serif;
  }
`;

export default GlobalStyle;
