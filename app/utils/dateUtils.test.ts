import dateDifferenceInHours from './dateUtils';

describe('Date utils tests', () => {
  it('should return the correct difference in hours', () => {
    const first = new Date('05/05/2020');
    const second = new Date('05/06/2020');

    expect(dateDifferenceInHours(first, second)).toEqual(24);
  });
});
