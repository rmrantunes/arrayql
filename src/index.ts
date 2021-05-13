import { BooleanKeys, QueryOptions } from "../index";

function isObject(item: any): boolean {
  return Object.prototype.toString.call(item).includes("Object");
}

function isArray(item: any): boolean {
  return Array.isArray(item);
}

function isArrayOrObject(item: any): boolean {
  return isArray(item) || isObject(item);
}

function objectQL<T>(object: T, booleanKeys: BooleanKeys<T>) {
  const selectedObjectKeys = Object.keys(booleanKeys);

  return selectedObjectKeys.reduce((mappedObject, key) => {
    const selectedPropValue = object[key];
    const isSelectedPropValueArray = isArray(selectedPropValue);
    const isSelectedPropValueObject =
      !isSelectedPropValueArray && isObject(selectedPropValue);
    const isSelectedPropValueArrayAndItsItemsPrimitive =
      isSelectedPropValueArray && !isArrayOrObject(selectedPropValue[0]);
    const recursiveBooleanKeys = booleanKeys[key];

    const value = isSelectedPropValueObject
      ? objectQL(selectedPropValue, recursiveBooleanKeys)
      : isSelectedPropValueArray
      ? isSelectedPropValueArrayAndItsItemsPrimitive
        ? selectedPropValue
        : arrayQL(selectedPropValue, recursiveBooleanKeys)
      : selectedPropValue;

    return { ...mappedObject, [key]: value };
  }, {});
}

export function arrayQL<T, R = any>(
  array: T[],
  queryOptions: QueryOptions<T>
): R[] {
  queryOptions.where ??= () => true;
  const mappedArray = [];
  for (const object of array) {
    if (!queryOptions.where(object)) continue;
    mappedArray.push(objectQL(object, queryOptions.keys));
  }
  return mappedArray;
}
