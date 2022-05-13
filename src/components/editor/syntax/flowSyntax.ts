const syntax = () => {
  return {
    token: (stream: any, state: any) => {
      if (stream.match(/\(.*?\)/)) {
        return 'variable';
      }
      if (stream.match(/:>+[\w!?/+\-_~;.,*&@#$%():'[\]]+/)) {
        return 'def';
      }
      if (stream.match(/: (.*)/)) {
        return 'def';
      }
      if (stream.match(/=>/)) {
        return 'keyword';
      }
      if (stream.match(/->/)) {
        return 'keyword';
      }
      if (stream.match(/=>/)) {
        return 'keyword';
      }
      stream.next();
      return null;
    },
  };
};

export default syntax;
