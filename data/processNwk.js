class Node {
  name;
  parent;
  yearsSinceParent;

  constructor(name, parent, yearsSinceParent) {
    this.name = name;
    this.parent = parent;
    this.yearsSinceParent = yearsSinceParent;
  }

  toString() {
    if (this.parent) {
      return this.name;
    }
    return `${this.name}, ${this.yearsSinceParent} years since ${this.parent.name}`;
  }
}

function makeNode(nodeString, parentNode) {
  let node, pattern;
  let isSpecies = false;
  // special case: ';\n' is root
  if (nodeString === ';\n') {
    node = Node('root', null, null);
  }
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
  const name = match[1];
  const years = match[2];

  // insert node
  console.log('INSERT NODE');
  if (isSpecies) {
    console.log('CREATE SPECIES');
  }
}