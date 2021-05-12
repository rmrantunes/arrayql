import { QueryOptions } from ".";

function objectQL<T>(keys: string[], object: T) {
  return keys.reduce((returned, key) => {
    return { ...returned, [key]: object[key] };
  }, {});
}

function arrayQL<T, R>(array: T[], queryOptions: QueryOptions<T>): R | any {
  const returned = array.map((object) => {
    const keys = Object.keys(queryOptions.keys);
    // if array recursive, if object
    return queryOptions.where(object) && objectQL(keys, object);
  });

  return returned.filter(Boolean);
}
