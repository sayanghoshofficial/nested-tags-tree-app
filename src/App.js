import React, { useState } from "react";
import './Styles/Style.css';
import { TagView } from './components';

const trees = {
  id: 1,
  items: [{
    id: 463333,
    name: " hello",
    items: [
      {
        id: 96524,
        name: "helloworld",
        items: [
          {
            id: 646646,
            name: "hello world 1234",
            items: []
          }
        ]
      }
    ]
  }, {
    id: 4646464,
    name: "react.js",
    items: [{
      id: 1896161,
      name: "javaScript",
      items: []
    }]
  }]
}


const App = () => {
  const [treeData, setTreeData] = useState(trees);
  return (
    <div className="App">
      <TagView tree={treeData} />
    </div>
  );
};

export default App;
