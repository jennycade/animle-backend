// TODO:
// script to generate targets for specified date range

const NO_REPEATS_DAYS = 7;

const createTargets = (tree, startDateString, endDateString) => {
  const targets = [];

  let date = new Date(startDateString);
  const recentNodeIds = [];
  while (date <= endDateString) {
    // randomly pick node
    let nodeId = tree[Math.floor(Math.random() * tree.length)]._id;
    // disallow repeats for x days
    while (recentNodeIds.includes(nodeId)) {
      // pick again!
      nodeId = tree[Math.floor(Math.random() * tree.length)]._id;
    }
    // add to recents
    recentNodeIds.push(nodeId);
    if (recentNodeIds.length > NO_REPEATS_DAYS) {
      recentNodeIds.splice(0, 1);
    }
    
    const newTarget = {
      date: date.toISOString().slice(0, 10),
      node: nodeId,
      guessCache: [],
    };
    targets.push(newTarget);

    date.setDate(date.getDate() + 1);
  }
  return targets;
}

module.exports = { createTargets };