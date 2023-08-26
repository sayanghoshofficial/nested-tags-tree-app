import React, { useState } from 'react';
import { BiSolidRightArrow, BiSolidDownArrow } from 'react-icons/bi';

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
            <div className='reply comment' onClick={onAddComment}>
              Add Child
            </div>
          </>
        ) : (
          <span style={{ wordWrap: "break-word" }}>{tree.name}</span>
        )}
      </div>
      {tree?.items?.map((t) => {return <TagView key={t.id} tree={t}/>})}
    </div>
  );
};

export default TagView;
