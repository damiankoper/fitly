import { sharedMeta } from './shared-meta';

describe('sharedMeta', () => {
  it('should work', () => {
    expect(sharedMeta()).toEqual('shared-meta');
  });
});
