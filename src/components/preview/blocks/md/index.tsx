import React, { useEffect, createRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { taskCheckedAction } from './task';

const Memoed = React.memo<{ value: string }>(({ value }) => {
  const preview: any = createRef();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const editor = state.editor;
  useEffect(() => {
    const tasks = preview.current.getElementsByTagName('input');
    taskCheckedAction(tasks, editor, dispatch);
    const headings = preview.current.querySelectorAll('.heading');
    if (headings) {
      headings.forEach((head: any) => {
        const id = Number(head.id.split('-')[1]);
        head.addEventListener('click', function () {
          dispatch({
            type: 'SET_CLICKED_LINE',
            clickedLine: id,
          });
          setTimeout(() => {
            dispatch({
              type: 'SET_CLICKED_LINE',
              clickedLine: 0,
            });
          }, 50);
        });
      });
    }
  }, [value]);
  return (
    <div
      ref={preview}
      style={{ width: '100%', maxWidth: '100%' }}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
});

const Component = (props: any) => {
  const memoValue = useMemo(() => props.value, [props.value]);
  return <Memoed value={memoValue} />;
};

export default Component;
