const { createTargets } = require('./generateTargets');

const tree = require('./Ursidae_tree.json');

describe('createTargets()', () => {
  it('makes 365 targets for one-year period', () => {
    const start = new Date('1/1/2022');
    const end = new Date('12/31/2022');
    const targets = createTargets(tree, start, end);
    expect(targets.length).toBe(365);
  });
  it('has fields date, node, and guessCache', () => {
    const start = new Date('1/1/2022');
    const end = new Date('1/31/2022');
    const targets = createTargets(tree, start, end);
    for (let i=1; i<=31; i++) {
      const target = targets[i-1];
      expect(target.date).toBe(`2022-01-${i.toString().padStart(2, '0')}`);
      expect(target.node).toEqual(expect.any(String));
      expect(target.guessCache).toEqual([]);
    }
  });
  it('avoids repeats for 7 days', () => {
    const NO_REPEATS_DAYS = 7;
    const start = new Date('1/1/2022');
    const end = new Date('12/31/2052');
    const targets = createTargets(tree, start, end);
    const slidingWindow = targets.slice(0, NO_REPEATS_DAYS).map(
      (target) => target.node
    );
    for (let i=NO_REPEATS_DAYS; i<targets.length; i++) {
      slidingWindow.push(targets[i].node);
      slidingWindow.splice(0, 1);
      const uniqueTargets = [...new Set(slidingWindow)];
      expect(slidingWindow.length).toBe(uniqueTargets.length);
    }
  });
});