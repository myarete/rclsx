import { rclsx } from './index';

test('Just a base class', () => {
  const actual = rclsx('base');
  const expected = 'base';

  expect(actual).toBe(expected);
});

test('Just a responsive object', () => {
  const actual = rclsx({ sm: 'sm-class other-sm-class' });
  const expected = 'sm:sm-class sm:other-sm-class';

  expect(actual).toBe(expected);
});

test('Base class with one responsive object key', () => {
  const actual = rclsx('base', { sm: 'sm-class other-sm-class' });
  const expected = 'base sm:sm-class sm:other-sm-class';

  expect(actual).toBe(expected);
});

test('Base class with one responsive object key', () => {
  const actual = rclsx('base', { sm: 'sm-class other-sm-class' });
  const expected = 'base sm:sm-class sm:other-sm-class';

  expect(actual).toBe(expected);
});

test('Base class with several responsive object keys', () => {
  const actual = rclsx('base', {
    sm: 'sm-class other-sm-class',
    md: 'md-class other-md-class',
  });

  const expected =
    'base sm:sm-class sm:other-sm-class md:md-class md:other-md-class';

  expect(actual).toBe(expected);
});

test('Whitespace craziness', () => {
  const actual = rclsx('  base  other-base     ', {
    sm: ' sm-class   other-sm-class  ',
    md: 'md-class       other-md-class     ',
  });

  const expected =
    'base other-base sm:sm-class sm:other-sm-class md:md-class md:other-md-class';

  expect(actual).toBe(expected);
});
