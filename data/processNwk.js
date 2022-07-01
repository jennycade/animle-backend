const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

async function makeNode(nodeString, parentNodeId, nodeJsonPath, speciesJsonPath) {
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
  const content = JSON.stringify({
    _id: id,
    parent: parentNodeId,
    yearsSinceParent: years,
  });
  try {
    await fs.appendFile(nodeJsonPath, content + ',\n');
    if (isSpecies) {
      const speciesId = uuidv4();
      const speciesStr = JSON.stringify({
        _id: speciesId,
        speciesName: name,
        otherNames: [],
        node: id,
      });
      await fs.appendFile(speciesJsonPath, speciesStr + ',\n');
    }
  } catch (err) {
    console.log(err);
  }

  return id;
}

const processNwk = async (nwkString, nodeJsonPath, speciesJsonPath) => {
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
          nodeInProgress, ancestor, nodeJsonPath, speciesJsonPath
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
            nodeJsonPath, speciesJsonPath
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
            nodeInProgress, ancestors[ancestors.length - 1], nodeJsonPath, speciesJsonPath
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

const processFile = async (nwkPath, nodeJsonPath, speciesJsonPath) => {
  

  // read, parse, and save data
  try {
    // start files and overwrite existing JSON
    await fs.writeFile(nodeJsonPath, '[\n');
    await fs.writeFile(speciesJsonPath, '[\n');

    const data = await fs.readFile(nwkPath, {encoding: 'utf8'});

    await processNwk(data, nodeJsonPath, speciesJsonPath);

    // finish files
    await fs.appendFile(nodeJsonPath, ']');
    await fs.appendFile(speciesJsonPath, ']');
  } catch (err) {
    console.log(err);
  }
}
processFile(
  '/Users/jennyzonka/Code/animle-backend/data/Ursidae_species.nwk',
  '/Users/jennyzonka/Code/animle-backend/data/Ursidae_species_nodes.json',
  '/Users/jennyzonka/Code/animle-backend/data/Ursidae_species_species.json',
);

// to seed the databases
// 1. fix the end of the json files manually (facepalm)
// 2. use mongoimport
// mongoimport --uri mongodb+srv://jennycade:PASSWORD@cluster0.hhhey.mongodb.net/animle --collection nodes --type json --file /Users/jennyzonka/Code/animle-backend/data/Ursidae_species_nodes.json --jsonArray
// mongoimport --uri mongodb+srv://jennycade:PASSWORD@cluster0.hhhey.mongodb.net/animle --collection animals --type json --file /Users/jennyzonka/Code/animle-backend/data/Ursidae_species_species.json --jsonArray