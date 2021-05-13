# 📦🔍 A "GraphQL" for arrays of objects

## Installation

#### `npm i arrayql`

#### `yarn add arrayql`

## Get started

### `arrayQL(array, queryOptions)`

### array: T[]

An array of objects.

### queryOptions: QueryOptions\<T\>

**keys: BooleanKeys\<T\>** - selects which keys will be in the output. They must be boolean, it doesn't matter if they're true or false.
**where?: (object: T) => boolean**: - (optional) filter callback that recieves each object and returns a boolean expression.

Considering GraphQL queries features, `arrayQL` is recursive, which means that you can have objects and arrays nested and it'll work for them as well. In below example, `friends` is also an array of objects. _Attention_: array of primitive values, like `keywords` which is an array of strings, must be selected as boolean, not as QueryOptions.

```js
import { arrayQL } from "arrayql";

const normalizedUsers = arrayQL(users, {
  keys: {
    name: true,
    id: true,
    keywords: true,
    address: {
      city: true,
      country: true,
    },
    friends: {
      keys: { id: true },
    },
  },
  where: ({ age }) => age > 23,
});
```

Now you know how to start, just go and query your arrays 😃.

## Contribute

You are able to share your ideas or propose changes/features.
Some problems are open to get a resolution:

- [ ] Infer the types of the returned array.
- [ ] Check input errors (object | array invalid structure).
- [ ] 🤔 Build a mutation option. Am I too crazy? I mean, who's gonna use it, anyway?

Let's say you want to help, one thing is important: the root `index.d.ts` file has to be manually copied to `lib/` folder after TS to JS compilation with `tsc`. 🤷‍♂️ _Let's change this as well, I'm not any tsconfig.json master._ But before doing this, just `yarn` the project dependencies and don't forget to `test` your implementations 😎.
