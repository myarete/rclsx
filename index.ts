interface ResponsiveObject {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  xxl?: string;
}

const iterator = (key: string) => (value: string): string => key + ':' + value;

export const rclsx = (...args: [string, ResponsiveObject]): string => {
  const [base = '', responsiveObject = {}] = args;

  const entries: Array<[string, string]> = Object.entries(responsiveObject);

  const result: string[] = entries.reduce(
    (acc, [key, value]) => {
      const additional = value.split(' ').map(iterator(key));
      return [...acc, ...additional];
    },
    [base],
  );

  return result.join(' ');
};

console.log(rclsx('lol', { sm: 'px-1 py-1', md: 'px-2 py-2' }));
