const fs = require('fs-extra');

export const getNameWithoutExtention = (name: string) => {
  const nameToShow = name.split('.');
  nameToShow.pop();
  let res = nameToShow.join('.');
  return res;
};

export function getFileName(path: string) {
  const res = path.split('/').pop() || '';
  return res;
}

export function getDirectoryName(path: string) {
  const temp = path.split('/');
  temp.pop();
  const res = temp.join('/');
  return res;
}

export function isExistFile(file: any) {
  try {
    fs.statSync(file);
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') return false;
  }
}

export function resetEditor(dispatch: any) {
  dispatch({
    type: 'SET_EDITOR',
    title: '',
    path: '',
    markdown: '',
    tags: [],
  });
}

export function getDate(date: any) {
  const day = [
    date.getFullYear(),
    ('00' + (date.getMonth() + 1)).slice(-2),
    ('00' + date.getDate()).slice(-2),
  ].join('/');
  const time = [
    ('00' + date.getHours()).slice(-2),
    ('00' + date.getMinutes()).slice(-2),
    ('00' + date.getSeconds()).slice(-2),
  ].join(':');
  return [day, time].join('__');
}

export function getTodayString() {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hours = d.getHours();
  var minutes = d.getMinutes();
  var seconds = d.getSeconds();
  var dateStr =
    year +
    ('0' + month).slice(-2) +
    ('0' + day).slice(-2) +
    ('0' + hours).slice(-2) +
    ('0' + minutes).slice(-2) +
    ('0' + seconds).slice(-2);
  return dateStr;
}

export const getRandom = () => {
  return Math.random().toString(32).substring(2);
};
