import ElementKeyIndexer from './ElementKeyIndexer';

describe('ElementKeyIndexer tests', () => {
  it('should return an incremented key when incrementing', () => {
    const indexer = new ElementKeyIndexer('key');
    expect(indexer.increment()).toEqual('key_1');
  });

  it('should return the current key', () => {
    const indexer = new ElementKeyIndexer('key');
    expect(indexer.toString()).toEqual('key_0');
  });
});
