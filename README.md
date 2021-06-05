### DEPRECATED
[Tailwind has come a long way](https://tailwindcss.com/docs/just-in-time-mode) since publishing this! The simplicity intended from using this module violates [their optimization recommendations and JIT capabilities](https://tailwindcss.com/docs/optimizing-for-production) entirely by dynamically concatenating class names, rendering the purging parser useless :) Oops! Thanks for checking it out anyway! ❤️

<img src="assets/logo.png" align="center" />

## rclsx 

**R**esponsive **CL**as**S**names... **X**  ¯\\_(ツ)_/¯

[![Build Status](https://travis-ci.com/altruisticsoftware/rclsx.svg?branch=master)](https://travis-ci.com/altruisticsoftware/rclsx)
[![Coverage Status](https://coveralls.io/repos/github/altruisticsoftware/rclsx/badge.svg?branch=master)](https://coveralls.io/github/altruisticsoftware/rclsx?branch=master)

Javascript objects for responsive utility classes. Inspired by 
  [tailwind](https://tailwindcss.com/), [clsx](https://github.com/lukeed/clsx), 
  and the [IBM 80](https://softwareengineering.stackexchange.com/questions/148677/why-is-80-characters-the-standard-limit-for-code-width).

### Installation

`npm i -S rclsx`

### Usage

```tsx
import { rclsx } from 'rclsx';

rclsx('mt-2', { sm: 'px-1 py-2', md: 'px-4 py-4' });

// => 'mt-2 sm:px-1 sm:py-2 md:px-4 md:py-4'
```

#### Todos: 
- [ ] Add checks for duplicate classNames
- [ ] Add secondary prefixes? (ie `{border: color-500 b t}`)