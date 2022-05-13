import remark from 'remark';
import math from 'remark-math';
import breaks from 'remark-breaks';
import katex from 'remark-html-katex';
import html from 'remark-html';
import gfm from 'remark-gfm';
import gemoji from 'remark-gemoji';
import frontmatter from 'remark-frontmatter';
import footnote from 'remark-footnotes';

let outline: any = [];
function buildOutline() {
  return (ast: any) => {
    outline = ast.children
      .filter((node: any) => {
        return node.type === 'heading';
      })
      .map((node: any) => {
        return {
          type: node.type,
          depth: node.depth,
          line: node.position.start.line,
          start: node.position.start.offset,
          end: node.position.end.offset,
          children: node.children,
        };
      });
  };
}

let blocks: any = [];
function buildBlocks() {
  return (ast: any) => {
    blocks = ast.children
      .filter((node: any) => {
        return node.type === 'code';
      })
      .map((node: any) => {
        return {
          id: `line-${node.position.start.line}`,
          lang: node.lang ? node.lang : '',
          position: node.position,
          value: node.value ? node.value : '',
          meta: node.meta ? node.meta : '',
        };
      });
  };
}

function getLineNumber() {
  return (ast: any) => {
    ast.children.map((node: any) => {
      if (node.type === 'heading') {
        node.data = {
          hProperties: {
            id: `line-${node.position.start.line}`,
            className: 'heading',
            'data-offset': `${node.position.start.offset}`,
          },
        };
      } else if (node.type === 'list') {
        node.data = {
          hProperties: {
            id: `line-${node.position.start.line}`,
            'data-offset': `${node.position.start.offset}`,
          },
        };
        node.children.map((e: any) => {
          e.data = {
            hProperties: {
              id: `line-${e.position.start.line}`,
              'data-offset': `${e.position.start.offset}`,
            },
          };
          if (e.children.length === 2) {
            e.children[1].children.map((ee: any) => {
              ee.data = {
                hProperties: {
                  id: `line-${ee.position.start.line}`,
                  'data-offset': `${ee.position.start.offset}`,
                },
              };
              if (ee.children.length === 2) {
                ee.children[1].children.map((eee: any) => {
                  eee.data = {
                    hProperties: {
                      id: `line-${eee.position.start.line}`,
                      'data-offset': `${eee.position.start.offset}`,
                    },
                  };
                });
              }
            });
          }
        });
      } else {
        node.data = {
          hProperties: {
            id: `line-${node.position.start.line}`,
            'data-offset': `${node.position.start.offset}`,
          },
        };
      }
    });
  };
}

function hideCodeblocks() {
  return (ast: any) => {
    ast.children.map((node: any) => {
      if (node.type === 'code') {
        node.value = '';
        node.data = {
          hProperties: {
            className: 'hidden-codeblock',
          },
        };
      }
    });
  };
}

const processor = remark()
  .use(breaks)
  .use(gfm)
  .use(getLineNumber)
  .use(math)
  .use(gemoji)
  .use(katex)
  .use(html)
  .use(frontmatter, ['yaml'])
  .use(footnote)
  .use(buildOutline)
  .use(buildBlocks)
  .use(hideCodeblocks);

const outlineRes = (raw: string): string[] => {
  remark().use(buildOutline).processSync(raw);
  return outline;
};

const res = (raw: string): string[] => {
  const compiled = processor.processSync(raw).toString();
  const splitted: string[] = compiled.split(
    '<pre><code class="hidden-codeblock"></code></pre>'
  );
  return splitted;
};

export const markdown = {
  compiled: [''],
  outline: outline,
  blocks: blocks,
  compile(raw: string) {
    this.compiled = res(raw);
    this.outline = outline;
    this.blocks = blocks;
  },
  compileOutline(raw: string) {
    this.outline = outlineRes(raw);
  },
};
