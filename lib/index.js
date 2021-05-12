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
    function objectQL(object, optionsKeysObject) {
        var queriedObjectKeys = Object.keys(optionsKeysObject);
        return queriedObjectKeys.reduce(function (returned, key) {
            var _a;
            var prop = object[key];
            var isPropArray = isArray(prop);
            var isPropObject = isObject(prop);
            var recursiveOptionsKeysObject = __assign({}, optionsKeysObject)[key];
            var value = isPropObject
                ? objectQL(prop, recursiveOptionsKeysObject)
                : isPropArray
                    ? arrayQL(prop, recursiveOptionsKeysObject)
                    : prop;
            return __assign(__assign({}, returned), (_a = {}, _a[key] = value, _a));
        }, {});
    }
    function arrayQL(array, queryOptions) {
        var returned = array.map(function (object) {
            var _a;
            (_a = queryOptions.where) !== null && _a !== void 0 ? _a : (queryOptions.where = function () { return true; });
            return queryOptions.where(object) && objectQL(object, queryOptions.keys);
        });
        return returned.filter(Boolean);
    }
    exports.arrayQL = arrayQL;
});
