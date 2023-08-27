import React, { useEffect, useRef, useState } from 'react';
import { BiSolidRightArrow, BiSolidDownArrow } from 'react-icons/bi';
import Action from './Action';

const TagView = ({ tree, handleInsertNode, handleEditNode, handleDeleteNode }) => {
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expandArrow, setExpandArrow] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [edit])

  const handleNewChild = () => {
    setExpandArrow(!expandArrow);

    setShowInput(true);
  };

  const onAddChild = () => {
    if (edit) {
      handleInsertNode(tree.id, inputRef?.current?.innerText);
    } else {
      setExpandArrow(true);
      handleInsertNode(tree.id, input);
      setShowInput(false);
      setInput("");
    }

    if (edit) setEdit(false);

  };

  const handleDelete =()=>{
    handleDeleteNode(tree.id)
  }

  return (
    <div>
      <div className={tree.id === 1 ? "inputContainer" : "childContainer"}>
        {tree.id === 1 ? (
          <>
            <input
              type='text'
              className='inputContainer__input first_input'
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='type...'
            />
            <Action className="reply child" type="Add Child" handleClick={onAddChild} />
          </>
        ) : (
          <>
            <span
              contentEditable={edit}
              suppressContentEditableWarning={edit}
              style={{ wordWrap: "break-word" }}
              ref={inputRef}
            >
              {tree.name}
            </span>
            <div style={{ display: 'flex', marginTop: 5 }}>
              {edit ? (
                <>
                  <Action
                    className="reply"
                    type="Save"
                    handleClick={onAddChild}
                  />
                  <Action
                    className="reply"
                    type="Cancel"
                    handleClick={() => {
                      if(inputRef.current){
                        inputRef.current.innerText = tree.name;
                      }
                        setEdit(false)

                      }}

                  />
                </>
              ) : (
                <>
                  <Action className="reply"
                    type={
                      <>
                        {expandArrow ? (
                          <BiSolidDownArrow />
                        ) : (<BiSolidRightArrow />)}{" "} Add
                      </>
                    }
                    handleClick={handleNewChild} />
                  <Action 
                  className="reply" 
                  type="Edit" 
                  handleClick={() => setEdit(true)} />
                  <Action 
                  className="reply" 
                  type="Delete"
                  handleClick={handleDelete}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div style={{ display: expandArrow ? "block" : 'none', paddingLeft: 25 }}>
        {showInput && (
          <div className='inputContainer'>
            <input
              type='text'
              className='inputContainer__input first_input'
              autoFocus
              onChange={(e) => setInput(e.target.value)}
              placeholder='type...'
            />
            <Action 
            className="reply" 
            type="Add" 
            handleClick={onAddChild} />
            <Action 
            className="reply" 
            type="Cancel" 
            handleClick={() => { 
              setShowInput(false); 
              setExpandArrow(false); 
            }} 
            />
          </div>
        )}
        {tree?.items?.map((t) => {
          return (
            <TagView
              key={t.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              tree={t}
            />)
        })}
      </div>
    </div>
  );
};

export default TagView;
