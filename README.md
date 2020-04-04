<img src="assets/logo.png" align="center" />

## rclsx
**R**esponsive **CL**as**S**names... **X**  ¯\\_(ツ)_/¯

> Javascript objects for responsive utility classes, inspired by 
  [tailwind](https://tailwindcss.com/), [clsx](https://github.com/lukeed/clsx), 
  and the [IBM 80](https://softwareengineering.stackexchange.com/questions/148677/why-is-80-characters-the-standard-limit-for-code-width).

Shout-out to [GreenyMcgee](https://github.com/greenymcgee) for helping with this brainchild 🔥

### Installation

`npm i -S rclsx`

### Usage

1. Basic
```tsx
import { rclsx } from 'rclsx';

rclsx('mt-2', { sm: 'px-1 py-2', md: 'px-4 py-4' })

// => 'mt-2 sm:px-1 sm:py-2 md:px-4 md:py-4'
```

2. Nested with `clsx`.
```tsx
import { rclsx } from 'rclsx';
import { clsx } from 'clsx';

rclsx({ 
  sm: clsx({ [SOME_TRUE_CONDITION]: 'conditional-small-class' }),
});

// => 'sm:conditional-small-class'
```