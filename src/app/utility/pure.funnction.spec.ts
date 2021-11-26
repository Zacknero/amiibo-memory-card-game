import {shuffle} from "./pure.function";

describe('Pure Functions', () => {
  it('metodo shuffle', () => {
    const list = [1, 2];
    const result = shuffle(list);
    expect(result).toEqual(result)
  })
})
