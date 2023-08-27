import React, { useState } from "react";
import './Styles/Style.css';
import { Action, TagView } from './components';
import { useNode } from "./hooks";

const trees = {
  id: 1,
  items: []
}

const App = () => {
  const [treeData, setTreeData] = useState(trees);
  const [exportedData, setExportedData] = useState("");
  const { insertNode, editNode, deleteNode } = useNode();

  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(treeData, folderId, item);
    setTreeData(finalStructure);
    setExportedData(""); // Clear exportedData after inserting
  };

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(treeData, folderId, value);
    setTreeData(finalStructure);
    setExportedData(""); // Clear exportedData after editing
  }

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(treeData, folderId);
    const temp = { ...finalStructure };
    setTreeData(temp);
    setExportedData(""); // Clear exportedData after deleting
  }

  const handleExport = () => {
    const exportedData = JSON.stringify(convertToExportFormat(treeData), null, 2);
    setExportedData(exportedData);
  };

  const convertToExportFormat = (node) => {
    if (node.items && node.items.length > 0) {
      return {
        name: node.name,
        children: node.items.map(item => convertToExportFormat(item))
      };
    } else {
      return {
        name: node.name,
        data: node.data
      };
    }
  };

  return (
    <div className="App">
      <TagView
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
        tree={treeData}
      />
      <div className="exportBtn">
        {treeData.items?.length > 0 && (
          <Action type="Export" className="reply child" handleClick={handleExport}/>
        )}
      </div>
      <div>
        {exportedData && (
          <pre>{exportedData}</pre>
        )}
      </div>
    </div>
  );
};

export default App;
