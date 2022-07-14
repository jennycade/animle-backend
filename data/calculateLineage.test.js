const {getLineage, getTreeLineage} = require('./calculateLineage');
const Ursidae_species_nodes = require('./Ursidae_species_nodes.json');

describe('getLineage()', () => {
  it('returns an empty array for root element', () => {
    const root = {
      '_id': 'f9d65514-a81a-4205-b1b0-fb080d79004c',
      'parent': null,
      'yearsSinceParent': null,
    };
    const lineage = getLineage(root, Ursidae_species_nodes);
    expect(lineage).toEqual([]);
  });
  it('returns correct lineage for root\'s child', () => {
    const child = {
      "_id":"fdea18ef-6d68-4909-8387-b4b199e759cc","parent":"f9d65514-a81a-4205-b1b0-fb080d79004c","yearsSinceParent":5318065
    };
    const lineage = getLineage(child, Ursidae_species_nodes);
    expect(lineage.length).toBe(1);
    expect(lineage).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ancestor: 'f9d65514-a81a-4205-b1b0-fb080d79004c',
          yearsSinceAncestor: 5318065
        })
      ])
    );
  });
  it('returns correct lineage for 8th-level descendant of root', () => {
    const des = {
      "_id":"22fc4390-cb31-4d27-aa21-ed85cb6cccdf","parent":"88482556-9761-41c5-bd21-32b8f16b18f1","yearsSinceParent":173000
    };
    const lineage = getLineage(des, Ursidae_species_nodes);
    const yearsSinceRoot = (
      5318065 +
      8035485 +
      1063000 +
      2334300 +
      1755400 +
      476000 +
      101000 +
      173000
    );

    expect(lineage.length).toBe(8);
    expect(lineage).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ancestor: 'f9d65514-a81a-4205-b1b0-fb080d79004c', // root
          yearsSinceAncestor: yearsSinceRoot
        })
      ])
    );
  });
});

describe('getTreeLineage', () => {
  it('returns correct lineage with a simple 3-level tree', () => {
    const tree = [
      {_id: 'A', parent: null, yearsSinceParent: null},
      {_id: 'B', parent: 'A', yearsSinceParent: 1},
      {_id: 'C', parent: 'A', yearsSinceParent: 2},
      {_id: 'D', parent: 'B', yearsSinceParent: 3},
      {_id: 'E', parent: 'B', yearsSinceParent: 4},
      {_id: 'F', parent: 'C', yearsSinceParent: 5},
      {_id: 'G', parent: 'C', yearsSinceParent: 6},
    ];
    const lineageTree = getTreeLineage(tree);
    expect(lineageTree.length).toBe(7);
    expect(lineageTree).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
            _id: 'D', lineage: expect.arrayContaining([
            expect.objectContaining({
              ancestor: 'A',
              yearsSinceAncestor: 4
            })
          ])
        })
      ])
    );
  });
  it('returns correct lineage for Ursidae tree', () => {
    const lineageTree = getTreeLineage(Ursidae_species_nodes);
    const yearsSinceRoot = (
      5318065 +
      8035485 +
      1063000 +
      2334300 +
      1755400 +
      476000 +
      101000 +
      173000
    );
    expect(lineageTree.length).toBe(Ursidae_species_nodes.length);
    expect(lineageTree).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: '22fc4390-cb31-4d27-aa21-ed85cb6cccdf',
          lineage: expect.arrayContaining([
            expect.objectContaining({
              ancestor: 'f9d65514-a81a-4205-b1b0-fb080d79004c',
              yearsSinceAncestor: yearsSinceRoot
            })
          ])
        })
      ])
    );
  })
});