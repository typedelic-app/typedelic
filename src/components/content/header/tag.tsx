import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import store from '../../../storage/storage';
import api from '../../../api';
import styled from 'styled-components';
import { AppState } from '../../../types';

function Tag() {
  const dispatch = useDispatch();
  const state = useSelector((state: AppState) => state);
  const { editor } = state;
  const [tag, setTag] = useState('');
  const trashPath: string = store.get('workspace.trashboxPath');

  const isTrash = useMemo(() => {
    if (editor.path !== '') {
      const dir = editor.path.slice(0, trashPath.length);
      return dir === trashPath;
    } else return false;
  }, [editor.path]);

  useEffect(() => {
    setTag('');
  }, [editor.path]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (tag === '' || isTrash) return;
    const newTags = editor.tags.concat();
    let isExist = newTags.includes(tag);
    if (!isExist) {
      api.addTag(tag, editor.path, state, dispatch);
      await newTags.push(tag);
      dispatch({
        type: 'SET_EDITOR_TAGS',
        tags: newTags,
      });
    }
    setTag('');
  }

  async function handleRemove(e: string) {
    await api.removeEditorTags(e, editor.path, state, dispatch);
  }

  return (
    <Wrapper className="tag">
      <div className="tag-list">
        {editor.tags.map((name: any) => {
          return (
            <TagWrapper key={name}>
              <i
                className="far fa-times-circle"
                onClick={() => {
                  handleRemove(name);
                }}
              />
              <span>{name}</span>
            </TagWrapper>
          );
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="tag-input"
          value={tag}
          onChange={(e: any) => {
            if (isTrash) return;
            setTag(e.target.value);
          }}
          placeholder="Add tags..."
          spellCheck="false"
        />
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.9;
  margin-bottom: 1px;
  form {
    margin-left: 5px;
    input {
      padding: 5px;
      font-size: 0.95em;
      margin-top: 2px;
    }
  }
  .tag-list {
    display: flex;
    align-items: center;
  }
`;

const TagWrapper = styled.span`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1px 10px 1px 0;
  margin-bottom: 1px;
  margin-left: 5px;
  font-size: 0.88em;
  border-radius: 20px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  font-weight: 600;
  span {
    display: inline-block;
    padding-top: 1px;
    white-space: nowrap;
  }
  i {
    display: inline-block;
    padding: 0;
    width: 10px;
    cursor: pointer;
    font-size: 13px;
    opacity: 0;
    transition: 0.2s ease;
    margin-bottom: 0px;
    &:hover {
      color: var(--primary);
    }
  }
  &:hover {
    i {
      width: auto;
      padding-right: 5px;
      padding-left: 7px;
      opacity: 1;
    }
  }
`;

export default Tag;
