// export type AllKeys = { __allKeys: boolean };
// BooleanKeys<T[P]> | AllKeys

export type BooleanKeys<T> = {
  [P in keyof T]?: T[P] extends any[]
    ? QueryOptions<T[P][0]>
    : T[P] extends Record<string, any>
    ? BooleanKeys<T[P]>
    : boolean;
};

export interface QueryOptions<T> {
  where?: (item: T) => boolean;
  keys: BooleanKeys<T>;
}

export function arrayQL<T, R = any>(
  array: T[],
  queryOptions: QueryOptions<T>
): R {
  return;
}

const array = [
  {
    name: "juca",
    age: 12,
    address: {
      street: "das dorgas",
    },
    friends: [
      {
        name: "jamelão",
        id: 1,
      },
    ],
  },
  {
    name: "juca",
    age: 12,
    address: {
      street: "das dorgas",
    },
    friends: [
      {
        name: "jamelão",
        id: 1,
      },
    ],
  },
];

arrayQL(array, {
  keys: {
    address: {
      street: true,
    },
    friends: {
      where: ({ name }) => name === "jamelão",
      keys: {
        id: true,
      },
    },
  },
});
