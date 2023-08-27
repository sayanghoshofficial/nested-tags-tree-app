import React, { useState } from 'react';
import { BiSolidRightArrow, BiSolidDownArrow } from 'react-icons/bi';
import Action from './Action';

const TagView = ({ tree }) => {
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expandArrow, setExpandArrow] = useState(false);

  const handleNewChild = () => {
     setExpandArrow(!expandArrow); 

    setShowInput(true);
  };

  const onAddComment = () => {
    // Implement your logic for adding a comment here
  };

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
            <Action className="reply comment" type="Add Child" handleClick={onAddComment} />
          </>
        ) : (
          <>
            <span style={{ wordWrap: "break-word" }}>{tree.name}</span>
            <div style={{ display: 'flex', marginTop: 5 }}>
              {edit ? (
                <>
                  <Action className="reply" type="Save" />
                  <Action className="reply" type="Cancel" handleClick={() => setEdit(false)} />
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
                  <Action className="reply" type="Edit" handleClick={() => setEdit(true)} />
                  <Action className="reply" type="Delete" />
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div style={{display: expandArrow?"block" : 'none', paddingLeft: 25 }}>
        {showInput && (
          <div className='inputContainer'>
            <input
              type='text'
              className='inputContainer__input first_input'
              autoFocus
              onChange={(e) => setInput(e.target.value)}
              placeholder='type...'
            />
            <Action className="reply" type="Add" />
            <Action className="reply" type="Cancel" handleClick={() => { setShowInput(false); setExpandArrow(false); }} />
          </div>
        )}
        {tree?.items?.map((t) => { return <TagView key={t.id} tree={t} /> })}
      </div>
    </div>
  );
};

export default TagView;
