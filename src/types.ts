export type AppState = {
  workspace: Workspace;
  note: Note;
  view: View;
  editor: Editor;
};

export type Workspace = {
  path: string;
  defaultFolder: string;
  defaultNote: string;
  allFolders: any;
  allFiles: any;
  dragItem: any;
  tags: any;
};
export type Editor = {
  title: string;
  path: string;
  markdown: string;
  line: number;
  clickedLine: number;
  tags: string[];
};

export type View = {
  color: string;
  viewMode: 'editor' | 'preview' | 'split' | 'outline';
  loading: boolean;
  offset: number;
  editingLine: number;
  imagePreviewMode: boolean;
  pdfPreviewMode: boolean;
};

export type Note = {
  title: string;
  selectedFolder: any;
  selectedTag: any;
  list: FileArray;
  listType: 'all' | 'folder' | 'tag' | 'trash';
  sorted: FileArray;
  sortMode: string;
  searched: FileArray;
  searchValue: string;
};

export type FileArray = Array<{
  name: string;
  fullPath: string;
  date: string;
  excerpt: string;
  tags: any;
  baseDir: string;
  leaf: boolean;
  tasks: any;
}>;
export interface IFile {
  name: string;
  fullPath: string;
  date: string;
  excerpt: string;
  tags: any;
  parent: string;
  leaf: boolean;
  tasks: any;
}
export interface IFolder {
  name: string;
  fullPath: string;
  parent: string;
  leaf: boolean;
}

export type Outline = Array<{
  type: string;
  depth: number;
  start: number;
  end: number;
  children: any;
}>;
