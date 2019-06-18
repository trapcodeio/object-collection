"use strict";
var lodash_1 = require("lodash");
/**
 * ObjectCollectionClass
 */
var ObjectCollection = /** @class */ (function () {
    /**
     * Object to use or a new object will be used.
     * @param data
     */
    function ObjectCollection(data) {
        if (data === void 0) { data = {}; }
        if (data === null || typeof data !== "object") {
            throw new Error("Object expected but got typeof " + typeof data + " instead");
        }
        this.data = data;
        return this;
    }
    /**
     * Return new instance of ObjectCollection;
     * @param data
     */
    ObjectCollection.use = function (data) {
        if (data === void 0) { data = {}; }
        return new ObjectCollection(data);
    };
    /**
     * Return path as an instance of object validator
     * @param path
     * @param [$default]
     */
    ObjectCollection.prototype.newInstanceFrom = function (path, $default) {
        return new ObjectCollection(this.get(path, $default));
    };
    /**
     * Return path as an instance of object validator but clones the object
     * This does not mutate main object in this.data
     * @param path
     * @param [$default]
     */
    ObjectCollection.prototype.cloneInstanceFrom = function (path, $default) {
        return new ObjectCollection(lodash_1["default"].cloneDeep(this.get(path, $default)));
    };
    /**
     * Return path as an instance of object validator but clones the object
     * This does not mutate main object in this.data
     * @alias ObjectCollection.cloneInstanceFrom
     */
    ObjectCollection.prototype.clonePath = function (path, $default) {
        return this.cloneInstanceFrom(path, $default);
    };
    ObjectCollection.prototype.cloneThis = function () {
        return new ObjectCollection(this["return"](true));
    };
    /**
     * Assign to object
     * @see _.assign
     */
    ObjectCollection.prototype.assign = function () {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i] = arguments[_i];
        }
        lodash_1["default"].assign.apply(lodash_1["default"], [this.data].concat(sources));
        return this;
    };
    /**
     * AssignIn
     * @see _.assignIn
     */
    ObjectCollection.prototype.assignIn = function () {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i] = arguments[_i];
        }
        lodash_1["default"].assignIn.apply(lodash_1["default"], [this.data].concat(sources));
        return this;
    };
    /**
     * AssignInWith
     * @see _.LodashAssignInWith
     */
    ObjectCollection.prototype.assignInWith = function (sources, customizer) {
        lodash_1["default"].assignInWith(this.data, sources, customizer);
        return this;
    };
    /**
     * AssignWith
     * @see _.LodashAssignWith
     */
    ObjectCollection.prototype.assignWith = function (sources, customizer) {
        lodash_1["default"].assignWith(this.data, sources, customizer);
        return this;
    };
    /**
     * At
     * @see _.LodashAt
     */
    ObjectCollection.prototype.at = function (paths) {
        return lodash_1["default"].at(this.data, paths);
    };
    /**
     * Clone object
     * @see _.LodashClone
     */
    ObjectCollection.prototype.clone = function () {
        return lodash_1["default"].clone(this.data);
    };
    /**
     * Clone object deep
     * @see _.LodashCloneDeep
     */
    ObjectCollection.prototype.cloneDeep = function () {
        return lodash_1["default"].cloneDeep(this.data);
    };
    /**
     * Clone object deep with
     * @see _.LodashCloneDeepWith
     */
    ObjectCollection.prototype.cloneDeepWith = function (customizer) {
        return lodash_1["default"].cloneDeepWith(this.data, customizer);
    };
    /**
     * Clone object with
     * @see _.LodashCloneWith
     */
    ObjectCollection.prototype.cloneWith = function (customizer) {
        return lodash_1["default"].cloneWith(this.data, customizer);
    };
    /**
     * Count Keys in Object
     */
    ObjectCollection.prototype.count = function () {
        return lodash_1["default"].size(this.data);
    };
    /**
     * Defaults
     * @see _.LodashDefaults
     */
    ObjectCollection.prototype.defaults = function () {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i] = arguments[_i];
        }
        lodash_1["default"].defaults.apply(lodash_1["default"], [this.data].concat(sources));
        return this;
    };
    /**
     * DefaultsDeep
     * @see _.LodashDefaultsDeep
     */
    ObjectCollection.prototype.defaultsDeep = function () {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i] = arguments[_i];
        }
        lodash_1["default"].defaultsDeep.apply(lodash_1["default"], [this.data].concat(sources));
        return this;
    };
    /**
     * Extend Object object
     * @see _.LodashExtend
     */
    ObjectCollection.prototype.extend = function () {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i] = arguments[_i];
        }
        return this.assign.apply(this, sources);
    };
    /**
     * Extend Object With to object
     * @see _.LodashExtendWith
     */
    ObjectCollection.prototype.extendWith = function (sources, customizer) {
        return this.assignInWith(sources, customizer);
    };
    /**
     * FindKey
     * @see _.LodashFindKey
     * @param predicate
     */
    ObjectCollection.prototype.findKey = function (predicate) {
        return lodash_1["default"].findKey(this.data, predicate);
    };
    /**
     * FindLastKey
     * @see _.LodashFindLastKey
     * @param predicate
     */
    ObjectCollection.prototype.findLastKey = function (predicate) {
        return lodash_1["default"].findLastKey(this.data, predicate);
    };
    /**
     * ForIn
     * @see _.LodashForIn
     * @param iteratee
     */
    ObjectCollection.prototype.forIn = function (iteratee) {
        return lodash_1["default"].forIn(this.data, iteratee);
    };
    /**
     * ForInRight
     * @see _.LodashForInRight
     * @param iteratee
     */
    ObjectCollection.prototype.forInRight = function (iteratee) {
        return lodash_1["default"].forInRight(this.data, iteratee);
    };
    /**
     * Functions
     * @see _.LodashFunctions
     */
    ObjectCollection.prototype.functions = function () {
        return lodash_1["default"].functions(this.data);
    };
    /**
     * FunctionsIn
     * @see _.LodashFunctionsIn
     */
    ObjectCollection.prototype.functionsIn = function () {
        return lodash_1["default"].functionsIn(this.data);
    };
    /**
     * Get path of object or return.
     * @method
     * @param {string|string[]} path
     * @param {*} [$default]
     * @return {*}
     */
    ObjectCollection.prototype.get = function (path, $default) {
        return lodash_1["default"].get(this.data, path, $default);
    };
    /**
     * Has path in object
     * @method
     * @param {string|string[]} path
     *
     * @see _.LodashHas
     * @return {boolean}
     */
    ObjectCollection.prototype.has = function (path) {
        return lodash_1["default"].has(this.data, path);
    };
    /**
     * HasIn path in object
     * @method
     * @param {string|string[]} path
     * @see _.LodashHasIn
     * @return {boolean}
     */
    ObjectCollection.prototype.hasIn = function (path) {
        return lodash_1["default"].hasIn(this.data, path);
    };
    /**
     * Invert
     * @see _.LodashInvert
     */
    ObjectCollection.prototype.invert = function () {
        return lodash_1["default"].invert(this.data);
    };
    /**
     *  InvertBy
     *  @see _.LodashInvertBy
     */
    ObjectCollection.prototype.invertBy = function (iteratee) {
        return lodash_1["default"].invertBy(iteratee);
    };
    /**
     * Invoke
     * @see _.LodashInvoke
     */
    ObjectCollection.prototype.invoke = function (path) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return lodash_1["default"].invoke.apply(lodash_1["default"], [this.data, path].concat(args));
    };
    /**
     * Keys
     * @see _.LodashKeys
     */
    ObjectCollection.prototype.keys = function () {
        return lodash_1["default"].keys(this.data);
    };
    /**
     * KeysIn
     * @see _.LodashKeysIn
     */
    ObjectCollection.prototype.keysIn = function () {
        return lodash_1["default"].keysIn(this.data);
    };
    /**
     * MapKeys
     * @see _.LodashMapKeys
     */
    ObjectCollection.prototype.mapKeys = function (iteratee) {
        return lodash_1["default"].mapKeys(this.data, iteratee);
    };
    /**
     * MapValues
     * @see _.LodashMapValues
     */
    ObjectCollection.prototype.mapValues = function (iteratee) {
        return lodash_1["default"].mapValues(this.data, iteratee);
    };
    /**
     * Merge
     * @see _.LodashMerge
     */
    ObjectCollection.prototype.merge = function () {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i] = arguments[_i];
        }
        lodash_1["default"].merge.apply(lodash_1["default"], [this.data].concat(sources));
        return this;
    };
    /**
     * MergeWith
     * @see _.LodashMergeWith
     */
    ObjectCollection.prototype.mergeWith = function (source, customizer) {
        lodash_1["default"].mergeWith(this.data, source, customizer);
        return this;
    };
    /**
     * Omit
     * @see _.LodashOmit
     */
    ObjectCollection.prototype.omit = function (paths) {
        return lodash_1["default"].omit(this.data, paths);
    };
    /**
     * OmitBy
     * @see _.LodashOmitBy
     */
    ObjectCollection.prototype.omitBy = function (predicate) {
        return lodash_1["default"].omitBy(this.data, predicate);
    };
    /**
     * Pick
     * @see _.LodashPick
     */
    ObjectCollection.prototype.pick = function (paths) {
        return lodash_1["default"].pick(this.data, paths);
    };
    /**
     * PickBy
     * @see _.LodashPickBy
     */
    ObjectCollection.prototype.pickBy = function (predicate) {
        return lodash_1["default"].pickBy(this.data, predicate);
    };
    /**
     * Result
     * @see _.LodashResult
     */
    ObjectCollection.prototype.result = function (path, $default) {
        return lodash_1["default"].result(this.data, path, $default);
    };
    /**
     * Set value to path of object.
     * @method
     * @param {PathType} path
     * @param {*} [value]
     * @return {*}
     */
    ObjectCollection.prototype.set = function (path, value) {
        if (typeof path === "object") {
            var keys = Object.keys(path);
            // tslint:disable-next-line:prefer-for-of
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                this.set(key, path[key]);
            }
        }
        else {
            lodash_1["default"].set(this.data, path, value);
        }
        return this;
    };
    /**
     * SetWith
     * @see _.LodashSetWith
     */
    ObjectCollection.prototype.setWith = function (path, value, customizer) {
        lodash_1["default"].setWith(this.data, path, value, customizer);
        return this;
    };
    /**
     * Size
     * @see _.LodashSize
     */
    ObjectCollection.prototype.size = function () {
        return lodash_1["default"].size(this.data);
    };
    /**
     * ToPairs
     * @see _.LodashToPairs
     */
    ObjectCollection.prototype.toPairs = function () {
        return lodash_1["default"].toPairs(this.data);
    };
    /**
     * ToPairsIn
     * @see _.LodashToPairsIn
     */
    ObjectCollection.prototype.toPairsIn = function () {
        return lodash_1["default"].toPairsIn(this.data);
    };
    /**
     * Transform
     * @see _.LodashTransform
     */
    ObjectCollection.prototype.transform = function (iteratee, accumulator) {
        // @ts-ignore
        return lodash_1["default"].transform(this.data, iteratee, accumulator);
    };
    /**
     * Unset a path in object.
     * @see _.LodashUnset
     */
    ObjectCollection.prototype.unset = function (path) {
        lodash_1["default"].unset(this.data, path);
        return this;
    };
    /**
     * Update
     * @see _.LodashUpdate
     */
    ObjectCollection.prototype.update = function (path, updater) {
        lodash_1["default"].update(this.data, path, updater);
        return this;
    };
    /**
     * UpdateWith
     * @see _.LodashUpdateWith
     */
    ObjectCollection.prototype.updateWith = function (path, updater, customizer) {
        lodash_1["default"].updateWith(this.data, path, updater, customizer);
        return this;
    };
    /**
     * Values
     * @see _.LodashValues
     */
    ObjectCollection.prototype.values = function () {
        return lodash_1["default"].values(this.data);
    };
    /**
     * Values
     * @see _.LodashValues
     */
    ObjectCollection.prototype.valuesIn = function () {
        return lodash_1["default"].valuesIn(this.data);
    };
    /**
     * Returns a path as array or creates one.
     * @param path
     * @param forceToArrayIfNotArray
     */
    ObjectCollection.prototype.array = function (path, forceToArrayIfNotArray) {
        var storedValue = this.get(path, undefined);
        if (storedValue === undefined) {
            this.set(path, []);
        }
        else {
            if (Array.isArray(storedValue)) {
                return storedValue;
            }
            else {
                if (forceToArrayIfNotArray) {
                    this.set(path, [storedValue]);
                }
                else {
                    throw new Error("Path: \"" + path + "\" exist but it's not an array.");
                }
            }
        }
        return this.get(path);
    };
    /**
     * Get path as instance of a ObjectCollection
     * @alias ObjectCollection.newInstanceFrom
     * @param path
     * @param $default
     */
    ObjectCollection.prototype.path = function (path, $default) {
        return this.newInstanceFrom(path, $default);
    };
    /**
     * Returns object being used.
     *
     * if clone is `true` this.cloneDeep is used.
     * else if clone is string `!deep`
     * this.clone is used;
     * @returns {*}
     */
    ObjectCollection.prototype["return"] = function (clone, cloneDeep) {
        if (cloneDeep === void 0) { cloneDeep = true; }
        if (clone === true) {
            return cloneDeep ? this.cloneDeep() : this.clone();
        }
        return this.data;
    };
    /**
     * Return 4.17.11
     */
    ObjectCollection._ = lodash_1["default"];
    /**
     * @alias ObjectCollection._
     */
    ObjectCollection.lodashVersion = "4.17.11";
    return ObjectCollection;
}());
module.exports = ObjectCollection;
