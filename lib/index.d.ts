// export type AllKeys = { __allKeys: boolean };
// BooleanKeys<T[P]> | AllKeys

type PrimitiveOrFunction =
  | string
  | number
  | boolean
  | null
  | undefined
  | (() => any);

export type BooleanKeys<T> = {
  [P in keyof T]?: T[P] extends any[]
    ? T[P] extends PrimitiveOrFunction[]
      ? boolean
      : QueryOptions<T[P][number]>
    : T[P] extends Record<string, any>
    ? BooleanKeys<T[P]>
    : boolean;
};

export interface QueryOptions<T> {
  where?: (object: T) => boolean;
  keys: BooleanKeys<T>;
}

export function arrayQL<T, R = any>(
  array: T[],
  queryOptions: QueryOptions<T>
): R[];
