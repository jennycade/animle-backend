const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

async function makeNode(nodeString, parentNodeId, jsonPath) {
  let pattern;
  let isSpecies = false;
  let name = null;
  let years = null;
  // special case: ';\n' is root
  if (nodeString !== ';\n') {
    // node without species:   'nodeName':millionYears
    // species node:           Genus_species:millionYears
    if (nodeString[0] === `'`) {
      pattern = /\'(\w+)\':([\d\.]+)/;
    } else {
      isSpecies = true;
      pattern = /([\w_]+):([\d\.]+)/;
    }
    // const regex = RegExp(pattern);
    const match = pattern.exec(nodeString);
    name = match[1].replaceAll('_', ' ');
    years = parseFloat(match[2]) * 1000000;
  }
  
  const id = uuidv4();
  const nodeData = {
    _id: id,
    parent: parentNodeId,
    yearsSinceParent: years,
    isSpecies: isSpecies,
    speciesName: isSpecies ? name : null,
    otherNames: isSpecies ? [] : null,
  };
  const content = JSON.stringify(nodeData);
  // write to file
  try {
    await fs.appendFile(jsonPath, content + ',\n');
  } catch (err) {
    console.log(err);
  }

  return id;
}

const processNwk = async (nwkString, jsonPath) => {
  let nodeInProgress = '';
  const ancestors = [];

  // read backwards
  let i = nwkString.length - 1;
  while (i >= 0) {
    const char = nwkString[i];
    switch (char) {
      case ')':
        // make node and add to ancestor stack
        const ancestor = ancestors.length === 0 ? null : ancestors[ancestors.length - 1]; // pass null for adding the root
        const newNode = await makeNode(
          nodeInProgress, ancestor, jsonPath
        );
        nodeInProgress = '';
        ancestors.push(newNode);
        i -= 1;
        break;
      case ',':
        // make new node
        if (nodeInProgress !== '') {
          await makeNode(
            nodeInProgress,
            ancestors[ancestors.length - 1],
            jsonPath
          );
          nodeInProgress = '';
        }
        i -= 1;
        break;
      case '(':
        // make node and remove most recent ancestor
        if (nodeInProgress !== '') {
          // there's a node to make (i.e. not multiple node closures in a row)
          await makeNode(
            nodeInProgress,
            ancestors[ancestors.length - 1],
            jsonPath
          );
          nodeInProgress = '';
        }
        ancestors.pop();
        i -= 1;
        break;
      default:
        nodeInProgress = char + nodeInProgress;
        i -= 1;
    }
  }
}

const processFile = async (nwkPath, jsonPath) => {
  
  // read, parse, and save data
  try {
    // start files and overwrite existing JSON
    await fs.writeFile(jsonPath, '[\n');

    const data = await fs.readFile(nwkPath, {encoding: 'utf8'});

    await processNwk(data, jsonPath);

    // finish files
    await fs.appendFile(jsonPath, ']');
  } catch (err) {
    console.log(err);
  }
}
processFile(
  '/Users/jennyzonka/Code/animle-backend/data/Ursidae_species.nwk',
  '/Users/jennyzonka/Code/animle-backend/data/Ursidae_species_nodes.json',
);

// to seed the databases
// 1. fix the end of the json files manually (facepalm)
// 2. run calculageLineage.js
// 3. use mongoimport
// mongoimport --uri mongodb+srv://jennycade:PASSWORD@cluster0.hhhey.mongodb.net/animle --collection nodes --type json --file /Users/jennyzonka/Code/animle-backend/data/Ursidae_tree.json --jsonArray