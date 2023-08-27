import React, { useState } from "react";
import './Styles/Style.css';
import { TagView } from './components';
import { useNode } from "./hooks";

const trees = {
  id: 1,
  items: []
}


const App = () => {
  const [treeData, setTreeData] = useState(trees);
  const { insertNode, editNode, deleteNode } = useNode();

  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(treeData, folderId, item);
    setTreeData(finalStructure);
  };

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(treeData, folderId, value);
    setTreeData(finalStructure);
  }

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(treeData, folderId);
    const temp = { ...finalStructure };
    setTreeData(temp);
  }
  return (
    <div className="App">
      <TagView
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
        tree={treeData} 
        />
    </div>
  );
};

export default App;
