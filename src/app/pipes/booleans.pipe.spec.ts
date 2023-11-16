import { BooleansPipe } from './booleans.pipe';

describe('BooleansPipe', () => {
  it('create an instance', () => {
    const pipe = new BooleansPipe();
    expect(pipe).toBeTruthy();
  });
});
