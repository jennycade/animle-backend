# recursively peel off outer parentheses
# sibling, (descendants)'nodeName':millionYears
# if !isNumeric(nodeName) -> make a species too

import re

# first: get recursion working
def processNwk(nwkPath):
  nwkFile = open(nwkPath, 'r')

  # preprocess
  nwk = nwkFile.read()[:-2] # strip ; and \n

  print('---------------------------------------------')
  print(nwk)
  print('---------------------------------------------')

  # recursion
  printLevel(nwk)

def printLevel(nwk: str):
  if nwk[0] == '(' and nwk[-1] == ')':
    print('root')
    printLevel(nwk[1:-1])
  else:
    pattern = r'([^\(]*)(\(.+\))(.*)'
    match = re.match(pattern, nwk)
    if match:
      print('---------------------------------------------')
      print(f'Before (:  {match.group(1)}')
      print(f'After ) :   {match.group(3)}')
      printLevel(match.group(2))
      # doesn't drill all the way down
  


    



  

processNwk('/Users/jennyzonka/Code/animle-backend/data/Ursidae_species.nwk')
