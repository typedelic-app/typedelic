import store from '../storage/storage';
const view = store.get('view');

const initialState = {
  color: view.color,
  viewMode: view.viewMode,
  loading: true,
  offset: 0,
  editingLine: 0,
  imagePreviewMode: false,
  pdfPreviewMode: false,
};

const reducer = (
  state = initialState,
  action: {
    type: string;
    color: string;
    viewMode: 'editor' | 'preview' | 'split' | 'outline';
    loading: boolean;
    editingLine: number;
    offset: number;
    imagePreviewMode: boolean;
    pdfPreviewMode: boolean;
  }
) => {
  switch (action.type) {
    case 'SET_COLOR':
      return {
        ...state,
        color: action.color,
      };
    case 'SET_VIEWMODE':
      return {
        ...state,
        viewMode: action.viewMode,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading,
      };
    case 'SET_EDITING_LINE':
      return {
        ...state,
        editingLine: action.editingLine,
      };
    case 'SET_SCROLL_OFFSET':
      return {
        ...state,
        offset: action.offset,
      };
    case 'SET_IMAGE_PREVIEW_MODE':
      return {
        ...state,
        imagePreviewMode: action.imagePreviewMode,
      };
    case 'SET_PDF_PREVIEW_MODE':
      return {
        ...state,
        pdfPreviewMode: action.pdfPreviewMode,
      };
    default:
      return state;
  }
};

export default reducer;
