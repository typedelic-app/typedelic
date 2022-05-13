import React, { useEffect, useState, useMemo } from 'react';
const plantumlEncoder = require('plantuml-encoder');
import { config } from './config';
import Wrapper from '../diagrams';

const Memoed = React.memo<{ id: string; meta: string; value: string }>(
  ({ id, meta, value }) => {
    const [newValue, setNewValue] = useState(value);

    useEffect(() => {
      if (value.startsWith('@')) {
        const splitted = value.split('\n');
        const first = splitted[0];
        splitted.shift();
        const trimmed = splitted.map((e) => {
          return e.trim();
        });
        const _value = trimmed.join('\n');
        setNewValue(first + config.skin2 + config.skin + _value);
      } else {
        setNewValue(config.skin + config.hideSpots + value);
      }
    }, [value]);

    const encoded = plantumlEncoder.encode(newValue);
    const url = 'http://www.plantuml.com/plantuml/img/' + encoded;
    return (
      <Wrapper id={id} type="png" meta={meta} value={url}>
        <img src={url} />
      </Wrapper>
    );
  }
);

const Component = (props: any) => {
  const memoId = useMemo(() => props.id, [props.id]);
  const memoValue = useMemo(() => props.value, [props.value]);
  const memoMeta = useMemo(() => props.meta, [props.meta]);
  return <Memoed id={memoId} meta={memoMeta} value={memoValue} />;
};

export default Component;
