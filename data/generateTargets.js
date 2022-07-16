// TODO:
// script to generate targets for specified date range

const NO_REPEATS_DAYS = 7;

const createTargets = (tree, startDateString, endDateString) => {
  const targets = [];

  let date = new Date(startDateString);
  const endDate = new Date(endDateString);
  const recentNodeIds = [];
  while (date <= endDate) {
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

const exportTargets = (treeJsonPath, targetsJsonPath, startDateString, endDateString) => {
  const fs = require('fs');
  try {
    const tree = require(treeJsonPath);
    const targets = createTargets(tree, startDateString, endDateString);
    fs.writeFileSync(targetsJsonPath, JSON.stringify(targets));
  } catch (err) {
    console.error(err);
  }
}
// exportTargets(
//   '/Users/jennyzonka/Code/animle-backend/data/Ursidae_tree.json',
//   '/Users/jennyzonka/Code/animle-backend/data/Ursidae_targets.json',
//   '7/16/2022',
//   '7/15/2023'
// );

module.exports = { createTargets };

/*
To use:
mongoimport --uri mongodb+srv://jennycade:PASSWORD@cluster0.hhhey.mongodb.net/animle --collection targets --type json --file /Users/jennyzonka/Code/animle-backend/data/Ursidae_targets.json --jsonArray
*/