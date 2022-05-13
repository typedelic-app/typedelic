import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../types';
import { TaglistWrapper } from './style';
import Tag from './tag';

const Tags = () => {
  const tags = useSelector((state: AppState) => state.workspace.tags);
  return (
    <TaglistWrapper className="tag-tree">
      <h2>
        <i className="fas fa-tags icon" />
        <span>Tags</span>
      </h2>
      <div className="tags">
        {tags.map((e: any) => {
          return <Tag key={e.name} name={e.name} paths={e.paths} />;
        })}
      </div>
    </TaglistWrapper>
  );
};

export default Tags;
