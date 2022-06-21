# recursively peel off outer parentheses
# sibling, (descendants)'nodeName':millionYears
# if !isNumeric(nodeName) -> make a species too

import re

class Node:
  def __init__(self, name, parent, yearsSinceParent) -> None:
    self.name = name
    self.parent = parent
    self.yearsSinceParent = yearsSinceParent
  def __str__(self) -> str:
    if self.parent == None:
      return f'{self.name}'
    return f'{self.name}, {self.yearsSinceParent} years since {self.parent.name}'
def makeNode(node):
  # read backwards string -> turn into Node
  print(node)

# first: get recursion working
def processNwk(nwkPath):
  nwkFile = open(nwkPath, 'r')

  # preprocess
  nwk = nwkFile.read()

  nodeInProgress = Node('root', None, None)
  ancestors = []

  print('---------------------------------------------')
  print(nwk)
  print('---------------------------------------------')

  # read backwards!
  i = len(nwk) - 1
  print(i)

  while i >= 0:
    char = nwk[i]
    if char == ')':
      # make node and add to ancestor stack
      makeNode(nodeInProgress)
      ancestors.append(nodeInProgress)
      nodeInProgress = None
      i -= 1
      continue
    if char == ',':
      if nodeInProgress:
        makeNode(nodeInProgress)
        nodeInProgress = None
      i -= 1
      continue
    if char == '(':
      # make node AND take top off stack
      pass

    print(f'Ignoring character {char}')
    i -= 1


processNwk('/Users/jennyzonka/Code/animle-backend/data/simple.nwk')
