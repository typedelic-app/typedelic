/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import styled from 'styled-components';
import SequenceDiagram from 'react-sequence-diagram';
import { getPallete } from '../../../../styles/Colors';
import Wrapper from '../diagrams';

const options = {
  theme: 'simple',
  css_class: 'seq',
};

const Memoed = React.memo<{
  id: string;
  meta: string;
  value: string;
  color: any;
}>(({ id, meta, value, color }) => {
  return (
    <Wrapper id={id} meta={meta}>
      <SeqWrapper className="seq inner">
        <SequenceDiagram input={value} options={options} />
      </SeqWrapper>
    </Wrapper>
  );
});

const Sequence = (props: { id: string; meta: string; value: string }) => {
  const { id, meta, value } = props;
  const color = getPallete();
  const memoValue = useMemo(() => value, [value]);
  return <Memoed id={id} meta={meta} value={memoValue} color={color} />;
};

const SeqWrapper = styled.div`
  overflow-x: scroll;
  svg {
    path,
    tspan {
      fill: var(--text);
      stroke: var(--text);
      stroke-width: 1;
      font-family: Nunito;
      font-size: 13px;
      letter-spacing: 0.1em;
    }
    .seq text {
      fill: var(--tect);
      stroke: var(--text);
      stroke-width: 1;
      font-size: 13px;
      letter-spacing: 0.1rem;
    }
    .signal text:hover {
      fill: #aaaaaa;
      font-size: 13px;
    }
    rect {
      fill: var(--background);
      stroke: var(--text);
      stroke-width: 1;
      letter-spacing: 0.1rem;
      tspan {
        letter-spacing: 0.1rem;
      }
    }
  }
`;

export default Sequence;
