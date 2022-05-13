import React from 'react';
import { render } from 'react-dom';
import App from './App';
const root = document.getElementById('root');
if (root) {
  render(<App root={true} />, document.getElementById('root'));
} else {
  render(<App root={false} />, document.getElementById('work'));
}
