<img src="assets/logo.png" align="center" />

## twclsx
> Javascript objects for utility classes, inspired by [tailwind](https://tailwindcss.com/) and [clsx](https://github.com/lukeed/clsx).

### Installation

`npm i -S twclsx`

### Usages

1. Default configuration, will separate with `':'` and delimit with `' '`.

```ts
import { twclsx } from 'twclsx';

twclsx('mt-2', {
  sm: 'px-1 py-2',
  md: 'px-4 py-4',
});

// => 'mt-2 sm:px-1 sm:py-2 md:px-4 md:py-4'
```

2. Custom configuration. 

```ts
// someUtilFile.{ts|js}
import { configure } from 'twclsx';

export const twclsx = configure({
  separator: '::',
  delimiter: '|'
});

// someOtherFile.{ts|js}
import { twclsx } from './someUtilFile';

twclsx('mt-2', {
  sm: 'px-1|py-2',
  md: 'px-4|py-4',
});

// => 'mt-2 sm::px-1 sm::py-2 md::px-4 md::py-4'
```

3. Custom configuration with type support.

```ts
// someUtilFile.{ts|js}
import { configure } from 'twclsx';

type BreakPoint = "small" | "medium";

export const twclsx = configure<BreakPoint>({});

// someOtherFile.{ts|js}
import { twclsx } from './someUtilFile';

twclsx('mt-2', {
  small: 'px-1 py-2',
  medium: 'px-4 py-4',
  large: '' // ts error, "large" not assignable to "BreakPoint".
});

```

4. React.

```tsx
import { twclsx } from 'twclsx';

const Component = () => (
  <div className={twclsx('mt-2', {
    sm: 'px-1 py-2',
    md: 'px-4 py-4',
  })}>
    {/* ... */}
  </div>
);

// => React.createElement("div", {
//      className: 'mt-2 sm:px-1 sm:py-2 md:px-4 md:py-4'
//    });
```

### Contributing

Open to contributions! :)