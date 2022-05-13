const initialState = {
  title: '',
  path: '',
  markdown: '',
  line: 0,
  clickedLine: 0,
  tags: [],
};

const reducer = (
  state = initialState,
  action: {
    type: string;
    title: string;
    path: string;
    markdown: string;
    line: number;
    clickedLine: number;
    tags: string[];
  }
) => {
  switch (action.type) {
    case 'SET_EDITOR_TITLE':
      return {
        ...state,
        title: action.title,
      };
    case 'SET_MARKDOWN':
      return {
        ...state,
        markdown: action.markdown,
        line: action.line,
      };
    case 'SET_EDITOR_PATH':
      return {
        ...state,
        path: action.path,
      };
    case 'SET_CURRENT_LINE':
      return {
        ...state,
        line: action.line,
      };
    case 'SET_CLICKED_LINE':
      return {
        ...state,
        clickedLine: action.clickedLine,
        line: 0,
      };
    case 'SET_EDITOR_TAGS':
      return {
        ...state,
        tags: action.tags,
      };
    case 'SET_EDITOR':
      return {
        ...state,
        title: action.title,
        path: action.path,
        markdown: action.markdown,
        tags: action.tags,
      };
    default:
      return state;
  }
};

export default reducer;
