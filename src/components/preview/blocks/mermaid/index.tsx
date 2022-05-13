/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useMemo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import mermaid from 'mermaid';
import { getConfig } from './config';
import { getPallete } from '../../../../styles/Colors';
import Wrapper, { ErrorWrapper } from '../diagrams';
import { AppState } from '../../../../types';

const Memoed = React.memo<{ id: string; meta: string; value: string }>(
  ({ id, meta, value }) => {
    const [svg, setSvg] = useState('');
    const [error, setError] = useState('');
    const color = getPallete();
    const view = useSelector((state: AppState) => state.view);

    useEffect(() => {
      const config = getConfig(color);
      mermaid.initialize(config);
      mermaid.contentLoaded();
      try {
        const mm = mermaid.render(`${id}-svg`, value.trim());
        setSvg(mm);
        setError('');
      } catch (e) {
        setError(e.toString().split('\n')[0]);
      }
    }, [id, value, view.color]);
    if (error !== '') {
      return <ErrorWrapper id={id}>{error}</ErrorWrapper>;
    }
    return (
      <Wrapper id={id} type="svg" meta={meta} value={svg}>
        <div
          className="svg-wrapper"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </Wrapper>
    );
  }
);

const MermaidComponent = (props: {
  id: string;
  meta: string;
  value: string;
}) => {
  const { id, meta, value } = props;
  const memoId = useMemo(() => id, [id]);
  const memoMeta = useMemo(() => meta, [meta]);
  const memoValue = useMemo(() => value, [value]);
  return <Memoed id={memoId} meta={memoMeta} value={memoValue} />;
};

export default MermaidComponent;
