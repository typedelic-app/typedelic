/* eslint-disable react/prop-types */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* ===============================================
#  color setting
=============================================== */
import React from 'react';
import { useSelector } from 'react-redux';
import { css, createGlobalStyle } from 'styled-components';

export const themes = [
  { key: 'calm', name: 'Meditation' },
  { key: 'tiger', name: 'Cobalt Tiger' },
  { key: 'valentine', name: 'Valentine' },
  { key: 'evergreen', name: 'Evergreen' },
  { key: 'bluegray', name: 'Bluegray' },
  { key: 'midnight', name: 'Midnight' },
];

const valentine = {
  background: 'rgb(45, 39, 59)',
  editorbg: '#2a2438',
  text: '#d9e2f3',
  border: '#3d3757',
  primary: '#ff5e86',
  secondary: '#fcb6d3',
  third: '#bd92ca',
  accent: '#ffc67b',
  comment: ' #8a8dbe',
  select: '#42374e',
  select2: '#42374eee',
};

const bluegray = {
  background: '#222429',
  editorbg: '#212127',
  text: '#b6bfcf',
  border: '#161718',
  primary: '#779eda',
  secondary: '#8dcae2',
  third: '#b8cbec',
  accent: '#669ff5',
  comment: ' #617a9c',
  select: '#303741',
  select2: '#303741ee',
};

const evergreen = {
  background: '#2c2c2c',
  editorbg: '#262626',
  text: '#ddd',
  border: '#222',
  primary: '#40b883',
  secondary: '#e4ca82',
  third: '#93ddbd',
  accent: '#40b883',
  comment: ' #65817e',
  select: '#3d3c26',
  select2: '#3d3c26ee',
};

const meditation = {
  background: '#252a34',
  editorbg: '#22252e',
  text: '#cfd3dc',
  border: '#1b1f25',
  primary: '#ffa9c4',
  third: '#efce8b',
  accent: '#bae5af',
  secondary: '#9bb3d5',
  comment: '#728281',
  select: '#65494f',
  select2: '#65494fee',
};

const tiger = {
  background: '#1b2533',
  editorbg: '#161f2b',
  text: '#bdc5d8',
  border: '#2a333f',
  primary: '#f0b752',
  secondary: '#f39969',
  third: '#ecd0a0',
  accent: '#a98bda',
  comment: ' #7b8ec2',
  select: '#3d3c26',
  select2: '#3d3c26ee',
};

const midnight = {
  background: '#0b1d2b',
  editorbg: '#011627',
  text: '#d6deeb',
  border: '#122d42',
  primary: '#c792ea',
  secondary: '#82AAFF',
  third: '#ffcb8b',
  accent: '#c5e478',
  comment: '#777faa',
  select: '#42374e',
  select2: '#42374eee',
};

export const getPalleteFromFunc = (color: string) => {
  if (color === 'bluegray') return bluegray;
  else if (color === 'evergreen') return evergreen;
  else if (color === 'valentine') return valentine;
  else if (color === 'tiger') return tiger;
  else if (color === 'midnight') return midnight;
  else return meditation;
};

export const getPallete = () => {
  const color = useSelector((state: any) => state.view.color);
  if (color === 'bluegray') return bluegray;
  else if (color === 'evergreen') return evergreen;
  else if (color === 'valentine') return valentine;
  else if (color === 'tiger') return tiger;
  else if (color === 'midnight') return midnight;
  else if (color === 'meditation') return meditation;
  else return meditation;
};

function Color() {
  const pallete: any = getPallete();
  function setColor() {
    let styles = '';
    for (const key in pallete) {
      styles += `--${key}: ${pallete[key]};`;
    }
    return css`
      :root {
        ${styles}
      }
    `;
  }

  const GlobalStyle = createGlobalStyle`${setColor}`;

  return <GlobalStyle />;
}

export default Color;
