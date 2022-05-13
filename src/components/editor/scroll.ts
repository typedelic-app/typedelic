async function scroll(editor: any, lineNum: number) {
  if (!editor) return;
  const lines: any[] = [];
  if (editor.current.editor.doc.children.length !== 0) {
    await editor.current.editor.doc.children.map((e: any) => {
      if (e.children) {
        // branch //
        e.children.map((el: any) => {
          el.lines.map((line: any) => {
            lines.push(line);
          });
        });
      } else {
        // leaf //
        if (e.lines && e.lines.length !== 0) {
          e.lines.map((line: any) => {
            lines.push(line);
          });
        }
      }
    });
  }
  let offset: number = 0;
  if (lines.length !== 0) {
    offset = await lines.slice(0, lineNum).reduce((a: any, b: any) => {
      return Number(a) + Number(b.height);
    }, 0);
  }
  let height = 0;
  if (lines[lineNum - 1]) {
    height = await lines[lineNum - 1].height;
  }
  if (editor.current) {
    editor.current.editor.scrollTo(0, offset - height);
  }
}

export default scroll;
