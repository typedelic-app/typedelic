const syntax = () => {
  return {
    token: (stream: any, state: any) => {
      if (stream.match(/: (.*)/)) {
        return 'def';
      }
      if (stream.start === 0) {
        if (stream.match(/database/)) {
          return 'keyword';
        } else if (stream.match(/entity/)) {
          return 'keyword';
        } else if (stream.match(/actor/)) {
          return 'keyword';
        } else if (stream.match(/agent/)) {
          return 'keyword';
        } else if (stream.match(/artifact/)) {
          return 'keyword';
        } else if (stream.match(/boundary/)) {
          return 'keyword';
        } else if (stream.match(/card/)) {
          return 'keyword';
        } else if (stream.match(/circle/)) {
          return 'keyword';
        } else if (stream.match(/collections/)) {
          return 'keyword';
        } else if (stream.match(/cloud/)) {
          return 'keyword';
        } else if (stream.match(/component/)) {
          return 'keyword';
        } else if (stream.match(/control/)) {
          return 'keyword';
        } else if (stream.match(/file/)) {
          return 'keyword';
        } else if (stream.match(/folder/)) {
          return 'keyword';
        } else if (stream.match(/frame/)) {
          return 'keyword';
        } else if (stream.match(/hexagon/)) {
          return 'keyword';
        } else if (stream.match(/interface/)) {
          return 'keyword';
        } else if (stream.match(/label/)) {
          return 'keyword';
        } else if (stream.match(/node/)) {
          return 'keyword';
        } else if (stream.match(/package/)) {
          return 'keyword';
        } else if (stream.match(/person/)) {
          return 'keyword';
        } else if (stream.match(/participant/)) {
          return 'keyword';
        } else if (stream.match(/queue/)) {
          return 'keyword';
        } else if (stream.match(/rectangle/)) {
          return 'keyword';
        } else if (stream.match(/stack/)) {
          return 'keyword';
        } else if (stream.match(/storage/)) {
          return 'keyword';
        } else if (stream.match(/usecase/)) {
          return 'keyword';
        } else if (stream.match(/^activate/)) {
          return 'keyword';
        } else if (stream.match(/^deactivate/)) {
          return 'keyword';
        } else if (stream.match(/^destroy/)) {
          return 'keyword';
        } else if (stream.match(/^!define/)) {
          return 'keyword';
        } else if (stream.match(/^!includeurl/)) {
          return 'keyword';
        } else if (stream.match(/^skinparam/)) {
          return 'keyword';
        }
      }
      if (stream.match(/\(.*?\)/)) {
        return 'variable';
      }
      if (stream.match(/\".*?\"/)) {
        return 'string';
      }
      if (stream.match(/ as /)) {
        return 'keyword';
      }
      if (stream.match(/\.>/)) {
        return 'variable';
      }
      if (stream.match(/=>/)) {
        return 'variable';
      }
      if (stream.match(/-->>/)) {
        return 'variable';
      }
      if (stream.match(/->>/)) {
        return 'variable';
      }
      if (stream.match(/--->/)) {
        return 'variable';
      }
      if (stream.match(/-->/)) {
        return 'variable';
      }
      if (stream.match(/->/)) {
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
      stream.next();
      return null;
    },
  };
};

export default syntax;
