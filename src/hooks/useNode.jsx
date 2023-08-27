import React from 'react'

const useNode = () => {
    const insertNode = function (tree, commentId, item) {
        if (tree.id === commentId) {
            const updatedTree = {
              ...tree,
              items: [
                ...tree.items,
                {
                  id: new Date().getTime(),
                  name: item,
                  items: [],
                },
              ],
            };
            return updatedTree;
          }
      
          const updatedItems = tree.items.map((ob) => {
            return insertNode(ob, commentId, item);
          });
      
          return { ...tree, items: updatedItems };
    };

    const editNode = function (tree, commentId, value) {
        if(tree.id === commentId){
            tree.name = value;
            return tree;
        }
        tree.items.map((ob)=>{
            return editNode(ob,commentId,value);
        })
        return {...tree};
     };

    const deleteNode = function (tree, id) { }

    return { insertNode, editNode, deleteNode };
}

export default useNode
