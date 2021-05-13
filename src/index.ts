import { BooleanKeys, QueryOptions } from "../index";

function isObject(item: any) {
  return Object.prototype.toString.call(item).includes("Object");
}

function isArray(item: any) {
  return Array.isArray(item);
}

function isNotArrayNorObject(item: any) {
  return !isArray(item) && !isObject(item);
}

function objectQL<T>(object: T, optionsKeysObject: BooleanKeys<T>) {
  const queriedObjectKeys = Object.keys(optionsKeysObject);

  return queriedObjectKeys.reduce((returned, key) => {
    const prop = object[key];
    const isPropArray = isArray(prop);
    const isPropObject = isObject(prop);
    const recursiveOptionsKeysObject = { ...optionsKeysObject }[key];

    const value = isPropObject
      ? objectQL(prop, recursiveOptionsKeysObject)
      : isPropArray
      ? isNotArrayNorObject(prop[0])
        ? prop
        : arrayQL(prop, recursiveOptionsKeysObject)
      : prop;

    return { ...returned, [key]: value };
  }, {});
}

export function arrayQL<T, R = any>(
  array: T[],
  queryOptions: QueryOptions<T>
): R[] {
  const returned = array.map((object) => {
    queryOptions.where ??= () => true;
    return queryOptions.where(object) && objectQL(object, queryOptions.keys);
  });

  return returned.filter(Boolean);
}

const a = [
  {
    tags: ["s", "s"],
  },
];
