import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TreeWrapper } from './style';
import Folder from './folder';

const Accordion = (props: any) => {
  const { depth, fullPath, name, files, checkActive } = props;
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div key={fullPath} className="accordion-wrapper">
      <Folder
        name={name}
        hasChildren={true}
        isOpen={isOpen}
        fullPath={fullPath}
        onClick={onClick}
        depth={depth}
        active={checkActive(fullPath) ? 'active' : ''}
      />
      <div key={fullPath} className={`accordion ${isOpen ? 'open' : 'close'}`}>
        {files && <RecursionComponent files={files} depth={depth} />}
      </div>
    </div>
  );
};

const RecursionComponent = (props: any) => {
  const note = useSelector((state: any) => state.note);
  const { files, depth } = props;
  const checkActive = (path: string) => {
    if (path === note.selectedFolder.path) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div>
      {files.map((file: any) => {
        if (file.children.length !== 0) {
          return (
            <Accordion
              key={file.fullPath}
              fullPath={file.fullPath}
              name={file.name}
              files={file.children}
              depth={depth + 1}
              checkActive={checkActive}
            />
          );
        }
        return (
          <Folder
            key={file.fullPath}
            name={file.name}
            hasChildren={false}
            isOpen={false}
            fullPath={file.fullPath}
            depth={depth}
            active={checkActive(file.fullPath) ? 'active' : ''}
          />
        );
      })}
    </div>
  );
};

export default function Tree(props: any): JSX.Element {
  const { files } = props;
  return (
    <TreeWrapper>
      <RecursionComponent files={files} depth={0} />
    </TreeWrapper>
  );
}
