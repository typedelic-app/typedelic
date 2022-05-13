import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';

import flowchart from 'flowchart.js';
import { getPallete } from '../../../../styles/Colors';
import Wrapper, { ErrorWrapper } from '../diagrams';

const Memoed = React.memo<{
  id: string;
  meta: string;
  value: string;
  color: any;
}>(({ id, value, meta, color }) => {
  const [errorMessage, setErrorMessage]: any = useState('Error: null');
  const [flag, setFlag]: any = useState(false);
  const [chart, ref]: any = useState();
  const opt = {
    x: 0,
    y: 0,
    'line-width': 1.5,
    'line-length': 30,
    'text-margin': 10,
    'font-size': 14,
    'font-color': color.text,
    'line-color': color.text,
    'element-color': color.text,
    'font-family': 'Nunito',
    fill: 'rgba(255,255,255,0.1)',
    'yes-text': 'yes',
    'no-text': 'no',
    'arrow-end': 'block',
    scale: 0.9,
    symbols: {
      start: {
        'font-color': color.text,
        'element-color': color.text,
        'font-weight': 'bold',
      },
      end: {
        'font-color': color.text,
        'element-color': color.text,
        'font-weight': 'bold',
      },
    },
  };

  const checkError = () => {
    if (value === '') {
      return true;
    }
    try {
      const parsed: any = flowchart.parse(value);
      if (parsed.start === null || parsed.symbols === null) {
        throw new Error('null');
      }
      if (chart) {
        chart.innerHTML = '';
        parsed.drawSVG(chart, opt);
      }
    } catch (e) {
      const error = e.toString().split('\n');
      setErrorMessage(error[0]);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const hasError = checkError();
    if (!hasError) {
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, [value, chart]);

  if (value === '' || flag === false) {
    return <ErrorWrapper id={id}>{errorMessage}</ErrorWrapper>;
  }
  return (
    <Wrapper id={id} meta={meta}>
      <FlowStyle>
        <div ref={(div: any) => ref(div)} className="inner" />
      </FlowStyle>
    </Wrapper>
  );
});

const Flowchart = (props: { id: string; meta: string; value: string }) => {
  const { id, meta, value } = props;
  const color = getPallete();
  const memoedValue = useMemo(() => value, [value]);
  return <Memoed id={id} meta={meta} value={memoedValue} color={color} />;
};

const FlowStyle = styled.div`
  max-width: 100%;
  opacity: 0.9;
  display: flex;
  align-items: center;
  justify-content: center;
  .inner {
    width: 100%;
    overflow-x: scroll;
    svg {
      width: auto !important;
    }
    rect {
      background: var(--background);
      fill: var(--background);
    }
    path#cond,
    path#io {
      background: var(--background);
      fill: var(--background);
    }
  }
`;

export default Flowchart;
