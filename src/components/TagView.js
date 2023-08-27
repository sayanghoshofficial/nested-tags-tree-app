import React, { useState } from 'react';
import { BiSolidRightArrow, BiSolidDownArrow } from 'react-icons/bi';
import Action from './Action';

const TagView = ({ tree }) => {
  const [input, setInput] = useState("");

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
              <Action className="reply" type="Add" />
              <Action className="reply" type="Edit" />
              <Action className="reply" type="Delete" /></div>
          </>
        )}
      </div>
      <div style={{ paddingLeft: 25 }}>
        {tree?.items?.map((t) => { return <TagView key={t.id} tree={t} /> })}
      </div>
    </div>
  );
};

export default TagView;
