import { twclsx, errors } from '.';

test('One responsive object key', () => {
  const actual = twclsx('px-1', { sm: 'py-1 mx-1' });
  const expected = 'px-1 sm:py-1 sm:mx-1';

  expect(actual).toBe(expected);
});

test('Several responsive object keys', () => {
  const actual = twclsx('px-1', { sm: 'py-1 mx-1', md: 'py-2 mx-2' });
  const expected = 'px-1 sm:py-1 sm:mx-1 md:py-2 md:mx-2';

  expect(actual).toBe(expected);
});

test('Non-string key values', () => {
  const expected = errors.INCORRECT_VALUE_TYPE;

  // @ts-ignore
  expect(() => twclsx('px-1', { sm: 123 })).toThrowError(expected);
});
