const syntax = () => {
  return {
    token: (stream: any, state: any) => {
      if (stream.match(/: (.*)/)) {
        return 'def';
      }
      if (stream.match(/^Title/)) {
        return 'keyword';
      }
      if (stream.match(/^participant/)) {
        return 'variable';
      }
      if (stream.match(/^Note/)) {
        return 'keyword';
      }
      if (stream.match(/=>/)) {
        return 'keyword';
      }
      if (stream.match(/-->>/)) {
        return 'keyword';
      }
      if (stream.match(/->>/)) {
        return 'keyword';
      }
      if (stream.match(/-->/)) {
        return 'keyword';
      }
      if (stream.match(/->/)) {
        return 'keyword';
      }
      if (stream.match(/:/)) {
        return 'variable';
      }
      stream.next();
      return null;
    },
  };
};

export default syntax;
