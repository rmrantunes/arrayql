var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.arrayQL = void 0;
    function isObject(item) {
        return Object.prototype.toString.call(item).includes("Object");
    }
    function isArray(item) {
        return Array.isArray(item);
    }
    function isArrayOrObject(item) {
        return isArray(item) || isObject(item);
    }
    function objectQL(object, booleanKeys) {
        var selectedObjectKeys = Object.keys(booleanKeys);
        return selectedObjectKeys.reduce(function (mappedObject, key) {
            var _a;
            var selectedPropValue = object[key];
            var isSelectedPropValueArray = isArray(selectedPropValue);
            var isSelectedPropValueObject = !isSelectedPropValueArray && isObject(selectedPropValue);
            var isSelectedPropValueArrayAndItsItemsPrimitive = isSelectedPropValueArray && !isArrayOrObject(selectedPropValue[0]);
            var recursiveBooleanKeys = booleanKeys[key];
            var value = isSelectedPropValueObject
                ? objectQL(selectedPropValue, recursiveBooleanKeys)
                : isSelectedPropValueArray
                    ? isSelectedPropValueArrayAndItsItemsPrimitive
                        ? selectedPropValue
                        : arrayQL(selectedPropValue, recursiveBooleanKeys)
                    : selectedPropValue;
            return __assign(__assign({}, mappedObject), (_a = {}, _a[key] = value, _a));
        }, {});
    }
    function arrayQL(array, queryOptions) {
        var _a;
        (_a = queryOptions.where) !== null && _a !== void 0 ? _a : (queryOptions.where = function () { return true; });
        var mappedArray = [];
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var object = array_1[_i];
            if (!queryOptions.where(object))
                continue;
            mappedArray.push(objectQL(object, queryOptions.keys));
        }
        return mappedArray;
    }
    exports.arrayQL = arrayQL;
});
