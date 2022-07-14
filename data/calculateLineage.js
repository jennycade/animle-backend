const getLineage = (node, tree) => {
  if (!node.parent) {
    return [];
  }
  const parent = tree.filter((n) => n._id === node.parent)[0];
  const parentLineage = getLineage(parent, tree);
  // add parent node
  parentLineage.push({ancestor: parent._id, yearsSinceAncestor: 0});
  // add years since parent to each generation distance
  parentLineage.forEach((generation) => generation.yearsSinceAncestor += node.yearsSinceParent);

  return parentLineage;
}



module.exports = getLineage;