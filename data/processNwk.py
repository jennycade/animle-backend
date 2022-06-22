# recursively peel off outer parentheses
# sibling, (descendants)'nodeName':millionYears
# if !isNumeric(nodeName) -> make a species too

import re

class Node:
  def __init__(self, name: str, parent, yearsSinceParent: int) -> None:
    self.name = name
    self.parent = parent
    self.yearsSinceParent = yearsSinceParent
  def __str__(self) -> str:
    if self.parent == None:
      return f'{self.name}'
    return f'{self.name}, {self.yearsSinceParent} years since {self.parent.name}'
def makeNode(nodeString: str, parentNode):
  # read string -> turn into Node

  # special case: ';\n' is root
  if nodeString == ';\n':
    node = Node('root', None, None)
    isSpecies = False
  else:
    # node without species:   'nodeName':millionYears
    # species node:           Genus_species:millionYears
    if nodeString[0] == '\'':
      isSpecies = True
      pattern = r'\'(\w+)\':([\d\.]+)'
    else:
      isSpecies = False
      pattern = r'([\w_]+):([\d\.]+)'
    match = re.match(pattern, nodeString)
    name = match.group(1).replace('_', ' ')
    years = int(float(match.group(2)) * 1000000)
    node = Node(name, parentNode, years)

  # todo: do something with isSpecies
  print(node)
  return node

def processNwk(nwkPath):
  nwkFile = open(nwkPath, 'r')

  # preprocess
  nwk = nwkFile.read()

  nodeInProgress = ''
  ancestors = []

  print('---------------------------------------------')
  print(nwk)
  print('---------------------------------------------')

  # read backwards
  i = len(nwk) - 1

  while i >= 0:
    char = nwk[i]
    if char == ')':
      # make node AND add to ancestor stack
      ancestor = None if len(ancestors) == 0 else ancestors[-1] # pass None for adding root
      newNode = makeNode(nodeInProgress, ancestor) 
      nodeInProgress = ''
      ancestors.append(newNode)
      i -= 1
      continue
    if char == ',':
      # make new node
      if nodeInProgress:
        makeNode(nodeInProgress, ancestors[-1])
        nodeInProgress = ''
      i -= 1
      continue
    if char == '(':
      # make node AND remove most recent ancestor
      if not nodeInProgress == '':
        # there's a node to make (i.e. not multiple node closures in a row)
        makeNode(nodeInProgress, ancestors[-1])
        nodeInProgress = ''
      ancestors.pop()
      i-= 1
      continue

    nodeInProgress = char + nodeInProgress
    i -= 1


processNwk('/Users/jennyzonka/Code/animle-backend/data/Ursidae_species.nwk')
