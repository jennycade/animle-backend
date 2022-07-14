const getLineage = (node, tree, lineageTree = null) => {
  if (!node.parent) {
    return [];
  }
  // check memoized tree
  let parentLineage;
  if (lineageTree) {
    const cachedParent = lineageTree.filter((n) => n._id === node.parent);
    if (cachedParent.length === 1) {
      parentLineage = deepCopy(cachedParent[0].lineage);
    }
  } else {
    const parent = tree.filter((n) => n._id === node.parent)[0];
    parentLineage = getLineage(parent, tree);
  }
  // add parent node
  parentLineage.push({ancestor: node.parent, yearsSinceAncestor: 0});
  // add years since parent to each generation distance
  parentLineage.forEach((generation) => generation.yearsSinceAncestor += node.yearsSinceParent);

  return parentLineage;
}

const getTreeLineage = (tree) => {
  const lineageTree = [];
  tree.forEach((node) => {
    const nodeLineage = getLineage(node, tree, lineageTree);
    const nodeWithLineage = {
      ...node,
      lineage: nodeLineage,
    }
    lineageTree.push(nodeWithLineage);
  });
  return lineageTree;
}

// from https://stackoverflow.com/questions/53273218/javascript-deep-copy-an-array-containing-nested-objects-arrays-functions
const deepCopy = (src) => {
  let target = Array.isArray(src) ? [] : {};
  for (let key in src) {
    let v = src[key];
    if (v) {
      if (typeof v === "object") {
        target[key] = deepCopy(v);
      } else {
        target[key] = v;
      }
    } else {
      target[key] = v;
    }
  }

  return target;
}

const processFile = (nodeJsonPath, lineageTreeJsonPath) => {
  const fs = require('fs');
  try {
    const tree = require(nodeJsonPath);
    const lineageTree = getTreeLineage(tree);
    fs.writeFileSync(lineageTreeJsonPath, JSON.stringify(lineageTree))
  } catch (err) {
    console.error(err);
  }
}

// processFile(
//   '/Users/jennyzonka/Code/animle-backend/data/Ursidae_species_nodes.json',
//   '/Users/jennyzonka/Code/animle-backend/data/Ursidae_tree.json'
// );


module.exports = {getLineage, getTreeLineage};