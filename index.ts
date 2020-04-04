/**
 * @description Default prefixes.
 */
interface ResponsiveObject {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  xxl?: string;
}

/**
 * @description Prefixes each chunked utility class.
 */
const iterator = (key: string) => (value: string): string => key + ':' + value;

/**
 * @description Replaces all instances of more than one space with just one, and
 * removes the outside whitespace.
 */
const format = (value: string): string => value.replace(/\s\s+/g, ' ').trim();

/**
 * @description Chunks each value associated with a breakpoint.
 */
const splitter = (value: string): string[] => format(value).split(' ');

/**
 * @description Merges all prefixed chunks into a single array.
 */
const reducer = (
  accumulator: string[],
  [key, value]: [string, string],
): string[] => [...accumulator, ...splitter(value).map(iterator(key))];

export const rclsx = (
  ...args: [string | ResponsiveObject, ResponsiveObject?]
): string => {
  let [base = '', responsiveObject = {}] = args;

  // If the first parameter is an object, we can assume there is no base class,
  // and that this is intended to be the responsive object.
  if (typeof base === 'object') {
    responsiveObject = base;
    base = '';
  }

  const entries: Array<[string, string]> = Object.entries(responsiveObject);

  const combined: string[] = entries.reduce(reducer, [format(base)]);

  return combined.join(' ');
};
