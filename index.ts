/**
 * @description Default keys for the responsive object param.
 */
export type BreakPoint = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface Config {
  /**
   * @description The character or set of characters denoting the breakpoint
   * before the applied classes.
   * @default ':'
   * @example
   * ```ts
   * import { configure } from 'twclsx';
   * const twclsx = configure({ separator: '::' });
   *
   * twclsx({ md: 'px-2' }); // => 'md::px-2'
   * ```
   */
  separator?: string;
  /**
   * @description The character or set of characters by which the className
   * should be divided prior to prefixing.
   * @default ' '
   * @example
   * ```ts
   * import { configure } from 'twclsx';
   * const twclsx = configure({ delimiter: '|' });
   *
   * twclsx({ md: 'px-2|py-2' }); // => 'md:px-2 md:py-2'
   * ```
   */
  delimiter?: string;
}

export type Twclsx = (
  /**
   * @description The utility classes that will be applied to all breakpoints.
   * Can be a string, or the responsive object if no shared classNames are
   * needed.
   * @example
   * ```ts
   * import { twclsx } from 'twclsx';
   *
   * twclsx('px-2 py-2'); // => 'px-2 py-2'
   * ```
   */
  base: string,
  /**
   * @description The object consisting of your breakpoints as the keys and the
   * applicable classNames as the values.
   * @example
   * ```ts
   * import { twclsx } from 'twclsx';
   *
   * twclsx({ sm: 'px-2', md: 'px-4' }); // => 'sm:px-2 md:px-4'
   * ```
   */
  params: Partial<Record<BreakPoint, string>>,
) => string;

/**
 * @description The default configuration to be merged / overwritten with a
 * custom one.
 */
const defaultConfig: Required<Config> = {
  separator: ':',
  delimiter: ' ',
};

/**
 * @description Error dictionary for easier testing.
 */
export const errors = {
  PARAMETERS_REQUIRED: 'twclsx: The `twclsx()` function requires parameters.',
  INCORRECT_VALUE_TYPE:
    'twclsx: The values of your responsive object must be strings.',
  NULL_PARAMS: 'twclsx: Params cannot be null.',
};

/**
 * @description Concatenates the breakpoint, separator, and className.
 * ie (md, :) => (px-2) => 'md:px-2'
 */
export type PrefixIterator = (
  breakPoint: string,
  separator: string,
) => (className: string) => string;

const prefixIterator: PrefixIterator = (breakPoint, separator) => className =>
  breakPoint + separator + className;

/**
 * @description Splits and prefixes the values for each abstract key in the
 * responsive object and adds returns them all in the own index of an array.
 */
export type Reducer = (
  accumulator: string[],
  [breakPoint, breakPointClassName]: [string, string | undefined],
) => string[];

const reducer: Reducer = (accumulator, [breakPoint, breakPointClassName]) => {
  // Values must be strings.
  if (typeof breakPointClassName !== 'string') {
    throw new Error(errors.INCORRECT_VALUE_TYPE);
  }

  // Where the magic happens, split the className by delimiter and concat.
  const prefixed: string[] = breakPointClassName
    .split(defaultConfig.delimiter)
    .map(prefixIterator(breakPoint, defaultConfig.separator));

  // Merge.
  return [...accumulator, ...prefixed];
};

/**
 * The mothership.
 */
export const twclsx: Twclsx = (base, params) => {
  if (typeof base === 'undefined') {
    // Can't pass undefined.
    throw new Error(errors.PARAMETERS_REQUIRED);
  }

  // Format the object to utilize abstract keys.
  const entries = Object.entries(params);

  // Acquire all the prefixed entries in an array of strings.
  const values: string[] = entries.reduce(reducer, [base]);

  // Done-zo.
  return values.join(' ');
};
