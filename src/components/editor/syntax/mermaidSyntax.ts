const syntax = () => {
  return {
    token: (stream: any, state: any) => {
      if (stream.match(/: (.*)/)) {
        return 'def';
      }
      if (stream.match(/%% (.*)/)) {
        return 'comment';
      }
      if (stream.start === 0) {
        if (stream.match(/erDiagram/)) {
          return 'keyword';
        } else if (stream.match(/graph/)) {
          return 'keyword';
        } else if (stream.match(/classDiagram/)) {
          return 'keyword';
        } else if (stream.match(/class/)) {
          return 'keyword';
        } else if (stream.match(/stateDiagram-v2/)) {
          return 'keyword';
        } else if (stream.match(/requirementDiagram/)) {
          return 'keyword';
        } else if (stream.match(/pie/)) {
          return 'keyword';
        } else if (stream.match(/gantt/)) {
          return 'keyword';
        } else if (stream.match(/sequenceDiagram/)) {
          return 'keyword';
        } else if (stream.match(/journey/)) {
          return 'keyword';
        } else if (stream.match(/flowchart/)) {
          return 'keyword';
        }
      }
      if (stream.match(/\|\|\.\.\|\|/)) {
        return 'variable';
      }
      if (stream.match(/\|\|\./)) {
        return 'variable';
      }
      if (stream.match(/\.\|\|/)) {
        return 'variable';
      }
      if (stream.match(/\|\|-/)) {
        return 'variable';
      }
      if (stream.match(/-\|\|/)) {
        return 'variable';
      }
      if (stream.match(/o-/)) {
        return 'variable';
      }
      if (stream.match(/-o/)) {
        return 'variable';
      }
      if (stream.match(/<<.*?>>/)) {
        return 'variable';
      }
      if (stream.match(/\(.*?\)/)) {
        return 'variable';
      }
      if (stream.match(/\|.*?\|/)) {
        return 'string';
      }
      if (stream.match(/\".*?\"/)) {
        return 'variable';
      }
      if (stream.match(/\|o-/)) {
        return 'variable';
      }
      if (stream.match(/-o\|/)) {
        return 'variable';
      }
      if (stream.match(/\|o\./)) {
        return 'variable';
      }
      if (stream.match(/\.o{/)) {
        return 'variable';
      }
      if (stream.match(/}o\./)) {
        return 'variable';
      }
      if (stream.match(/\.o\|/)) {
        return 'variable';
      }
      if (stream.match(/-\|{/)) {
        return 'variable';
      }
      if (stream.match(/}\|-/)) {
        return 'variable';
      }
      if (stream.match(/class /)) {
        return 'keyword';
      }
      if (stream.match(/<\|/)) {
        return 'variable';
      }
      if (stream.match(/\|>/)) {
        return 'variable';
      }
      if (stream.match(/</)) {
        return 'variable';
      }
      if (stream.match(/>/)) {
        return 'variable';
      }
      if (stream.match(/<\|/)) {
        return 'variable';
      }
      if (stream.match(/:/)) {
        return 'variable';
      }
      if (stream.match(/\*/)) {
        return 'variable';
      }
      if (stream.match(/\[/)) {
        return 'variable';
      }
      if (stream.match(/\]/)) {
        return 'variable';
      }
      if (stream.match(/-/)) {
        return 'variable';
      }
      if (stream.match(/\./)) {
        return 'variable';
      }
      if (stream.match(/~/)) {
        return 'variable';
      }
      if (stream.match(/=/)) {
        return 'variable';
      }
      if (stream.match(/\+/)) {
        return 'variable';
      }
      if (stream.match(/{/)) {
        return 'variable';
      }
      if (stream.match(/}/)) {
        return 'variable';
      }
      stream.next();
      return null;
    },
  };
};

export default syntax;
