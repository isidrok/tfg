/* eslint-disable */
import {mask} from './mask';
describe('mask', () => {
  it('masks the value', () => {
    const actual = mask('0123456789', 8);
    const expected = '********89';
    expect(actual).toEqual(expected);
  });
});
