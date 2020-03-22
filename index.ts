export type DefaultBreakPoint = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface Config {
  /**
   * The character or set of characters denoting the breakpoint before the
   * applied classes.
   * @default ':'
   * @example { separator: '::' } - { md: 'your-class' } => 'md::your-class'
   */
  separator?: string;
  /**
   * The character or set of characters by which the className should be divided
   * prior to prefixing.
   * @default ' '
   * @example { delimiter: '|' } - { md: 'hello|world' } => 'md:hello md:world'
   */
  delimiter?: string;
}

export type Twclsx<BreakPoint extends string> = (
  /**
   * The utility classes that will be applied to all breakpoints.
   * @example 'px-2 py-2'
   */
  base: string,
  /**
   * The object consisting of your breakpoints as the keys and the applicable
   * classNames as the values.
   * @example { sm: 'small-class', md: 'medium-class' }
   */
  responsiveObject: Partial<Record<BreakPoint, string>>,
  /**
   * See Config interface.
   */
  config?: Config,
) => string;

const defaultConfig: Required<Config> = {
  separator: ':',
  delimiter: ' ',
};

export const errors = {
  INCORRECT_KEY_TYPE: 'The values of your responsive object must be strings.',
};

const prefixIterator = (size: string, separator: string) => (
  className: string,
) => size + separator + className;

export const twclsx: Twclsx<DefaultBreakPoint> = (
  base,
  responsiveObject,
  config,
) => {
  const mergedConfig: Required<Config> = {
    ...defaultConfig,
    ...config,
  };

  const values: string[] = Object.entries(responsiveObject).reduce(
    (accumulator, [size, sizeClassName]) => {
      if (typeof sizeClassName !== 'string') {
        throw new Error(errors.INCORRECT_KEY_TYPE);
      }

      const prefixed: string[] = sizeClassName
        .split(mergedConfig.delimiter)
        .map(prefixIterator(size, mergedConfig.separator));

      return [...accumulator, ...prefixed];
    },
    [base],
  );

  return values.join(' ');
};

type FirstParam<T> = Parameters<Twclsx<T extends string ? T : never>>[0];
type SecondParam<T> = Parameters<Twclsx<T extends string ? T : never>>[1];

export const configure = <CustomBreakPoint = DefaultBreakPoint>(
  config: Partial<Config>,
) => (
  base: FirstParam<CustomBreakPoint>,
  responsiveObject: SecondParam<CustomBreakPoint>,
) => twclsx(base, responsiveObject, config);
