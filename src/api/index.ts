import readFile from './file/readFile';
import createFile from './file/createFile';
import moveFile from './file/moveFile';
import removeFile, { removePermanently } from './file/removeFile';
import renameFile from './file/renameFile';
import saveFile from './file/saveFile';
import saveNewFile from './file/saveNewFile';
import createFolder from './folder/createFolder';
import moveFolder from './folder/moveFolder';
import removeFolder from './folder/removeFolder';
import renameFolder from './folder/renameFolder';
import emptyTrash from './folder/emptyTrash';
import addTag from './tag/addTag';
import getExistTags from './tag/getExistTags';
import getRenamedTags from './tag/getRenamedTags';
import getTagsForNote from './tag/getTagsForNote';
import removeEditorTags from './tag/removeEditorTags';
import removeTag from './tag/removeTag';
import renameTag from './tag/renameTag';
import getAllNotes from './workspace/getAllData';
import getNotes from './workspace/getNotes';
import searchNotes from './workspace/searchNotes';
import sortNotes from './workspace/sortNotes';
import getFolderedNotes from './workspace/getFolderedNotes';
import getTaggedNotes from './workspace/getTaggedNotes';
import reloadNotes from './workspace/reloadNotes';
import exportAsMd from './export/md';
import exportAsPdf, { openPdfPreview } from './export/pdf';
import exportAsJpg, { openImagePreview } from './export/jpg';

const api = {
  readFile,
  createFile,
  moveFile,
  removeFile,
  removePermanently,
  renameFile,
  saveFile,
  saveNewFile,
  createFolder,
  moveFolder,
  removeFolder,
  renameFolder,
  emptyTrash,
  addTag,
  getExistTags,
  getRenamedTags,
  getTagsForNote,
  removeEditorTags,
  removeTag,
  renameTag,
  getAllNotes,
  getNotes,
  searchNotes,
  sortNotes,
  getFolderedNotes,
  getTaggedNotes,
  reloadNotes,
  exportAsMd,
  exportAsPdf,
  openPdfPreview,
  openImagePreview,
  exportAsJpg,
};

export default api;
