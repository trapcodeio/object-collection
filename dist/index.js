"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const lodash_1 = __importDefault(require("lodash"));
/**
 * ObjectCollectionClass
 */
class ObjectCollection {
    /**
     * Object to use or a new object will be used.
     * @param data
     */
    constructor(data = {}) {
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
    static use(data = {}) {
        return new ObjectCollection(data);
    }
    /**
     * Return path as an instance of object validator
     * @param path
     * @param [$default]
     */
    newInstanceFrom(path, $default) {
        return new ObjectCollection(this.get(path, $default));
    }
    /**
     * Return path as an instance of object validator but clones the object
     * This does not mutate main object in this.data
     * @param path
     * @param [$default]
     */
    cloneInstanceFrom(path, $default) {
        return new ObjectCollection(lodash_1.default.cloneDeep(this.get(path, $default)));
    }
    /**
     * Return path as an instance of object validator but clones the object
     * This does not mutate main object in this.data
     * @alias ObjectCollection.cloneInstanceFrom
     */
    clonePath(path, $default) {
        return this.cloneInstanceFrom(path, $default);
    }
    cloneThis() {
        return new ObjectCollection(this.return(true));
    }
    /**
     * Assign to object
     * @see _.assign
     */
    assign(...sources) {
        lodash_1.default.assign(this.data, ...sources);
        return this;
    }
    /**
     * AssignIn
     * @see _.assignIn
     */
    assignIn(...sources) {
        lodash_1.default.assignIn(this.data, ...sources);
        return this;
    }
    /**
     * AssignInWith
     * @see _.LodashAssignInWith
     */
    assignInWith(sources, customizer) {
        lodash_1.default.assignInWith(this.data, sources, customizer);
        return this;
    }
    /**
     * AssignWith
     * @see _.LodashAssignWith
     */
    assignWith(sources, customizer) {
        lodash_1.default.assignWith(this.data, sources, customizer);
        return this;
    }
    /**
     * At
     * @see _.LodashAt
     */
    at(paths) {
        return lodash_1.default.at(this.data, paths);
    }
    /**
     * Clone object
     * @see _.LodashClone
     */
    clone() {
        return lodash_1.default.clone(this.data);
    }
    /**
     * Clone object deep
     * @see _.LodashCloneDeep
     */
    cloneDeep() {
        return lodash_1.default.cloneDeep(this.data);
    }
    /**
     * Clone object deep with
     * @see _.LodashCloneDeepWith
     */
    cloneDeepWith(customizer) {
        return lodash_1.default.cloneDeepWith(this.data, customizer);
    }
    /**
     * Clone object with
     * @see _.LodashCloneWith
     */
    cloneWith(customizer) {
        return lodash_1.default.cloneWith(this.data, customizer);
    }
    /**
     * Count Keys in Object
     */
    count() {
        return this.keys().length;
    }
    /**
     * Defaults
     * @see _.LodashDefaults
     */
    defaults(...sources) {
        lodash_1.default.defaults(this.data, ...sources);
        return this;
    }
    /**
     * DefaultsDeep
     * @see _.LodashDefaultsDeep
     */
    defaultsDeep(...sources) {
        lodash_1.default.defaultsDeep(this.data, ...sources);
        return this;
    }
    /**
     * Check if path Exists in object
     */
    exists(path) {
        if (Array.isArray(path)) {
            for (const key of path) {
                if (!this.exists(key)) {
                    return false;
                }
            }
            return true;
        }
        return typeof path === "string" && this.has(path);
    }
    /**
     * Extend Object object
     * @see _.LodashExtend
     */
    extend(...sources) {
        return this.assign(...sources);
    }
    /**
     * Extend Object With to object
     * @see _.LodashExtendWith
     */
    extendWith(sources, customizer) {
        return this.assignInWith(sources, customizer);
    }
    /**
     * FindKey
     * @see _.LodashFindKey
     * @param predicate
     */
    findKey(predicate) {
        return lodash_1.default.findKey(this.data, predicate);
    }
    /**
     * FindLastKey
     * @see _.LodashFindLastKey
     * @param predicate
     */
    findLastKey(predicate) {
        return lodash_1.default.findLastKey(this.data, predicate);
    }
    /**
     * ForIn
     * @see _.LodashForIn
     * @param iteratee
     */
    forIn(iteratee) {
        return lodash_1.default.forIn(this.data, iteratee);
    }
    /**
     * ForInRight
     * @see _.LodashForInRight
     * @param iteratee
     */
    forInRight(iteratee) {
        return lodash_1.default.forInRight(this.data, iteratee);
    }
    /**
     * Functions
     * @see _.LodashFunctions
     */
    functions() {
        return lodash_1.default.functions(this.data);
    }
    /**
     * FunctionsIn
     * @see _.LodashFunctionsIn
     */
    functionsIn() {
        return lodash_1.default.functionsIn(this.data);
    }
    /**
     * Get path of object or return.
     * @method
     * @param {string|string[]} path
     * @param {*} [$default]
     * @return {*}
     */
    get(path, $default) {
        return lodash_1.default.get(this.data, path, $default);
    }
    /**
     * Has path in object
     * @method
     * @param {string|string[]} path
     *
     * @see _.LodashHas
     * @return {boolean}
     */
    has(path) {
        return lodash_1.default.has(this.data, path);
    }
    /**
     * HasIn path in object
     * @method
     * @param {string|string[]} path
     * @see _.LodashHasIn
     * @return {boolean}
     */
    hasIn(path) {
        return lodash_1.default.hasIn(this.data, path);
    }
    /**
     * Invert
     * @see _.LodashInvert
     */
    invert() {
        return lodash_1.default.invert(this.data);
    }
    /**
     *  InvertBy
     *  @see _.LodashInvertBy
     */
    invertBy(iteratee) {
        return lodash_1.default.invertBy(iteratee);
    }
    /**
     * Invoke
     * @see _.LodashInvoke
     */
    invoke(path, ...args) {
        return lodash_1.default.invoke(this.data, path, ...args);
    }
    /**
     * Keys
     * @see _.LodashKeys
     */
    keys() {
        return lodash_1.default.keys(this.data);
    }
    /**
     * KeysIn
     * @see _.LodashKeysIn
     */
    keysIn() {
        return lodash_1.default.keysIn(this.data);
    }
    /**
     * MapKeys
     * @see _.LodashMapKeys
     */
    mapKeys(iteratee) {
        return lodash_1.default.mapKeys(this.data, iteratee);
    }
    /**
     * MapValues
     * @see _.LodashMapValues
     */
    mapValues(iteratee) {
        return lodash_1.default.mapValues(this.data, iteratee);
    }
    /**
     * Merge
     * @see _.LodashMerge
     */
    merge(...sources) {
        lodash_1.default.merge(this.data, ...sources);
        return this;
    }
    /**
     * MergeWith
     * @see _.LodashMergeWith
     */
    mergeWith(source, customizer) {
        lodash_1.default.mergeWith(this.data, source, customizer);
        return this;
    }
    /**
     * Omit
     * @see _.LodashOmit
     */
    omit(paths) {
        return lodash_1.default.omit(this.data, paths);
    }
    /**
     * Omit and return instance of ObjectCollection
     * @returns {ObjectCollection}
     */
    forget(paths) {
        return ObjectCollection.use(this.omit(paths));
    }
    /**
     * OmitBy
     * @see _.LodashOmitBy
     */
    omitBy(predicate) {
        return lodash_1.default.omitBy(this.data, predicate);
    }
    /**
     * Pick
     * @see _.LodashPick
     */
    pick(paths) {
        return lodash_1.default.pick(this.data, paths);
    }
    /**
     * Collect
     * Returns instance of ObjectCollection
     * @returns {ObjectCollection}
     */
    collect(paths) {
        return ObjectCollection.use(this.pick(paths));
    }
    /**
     * PickBy
     * @see _.LodashPickBy
     */
    pickBy(predicate) {
        return lodash_1.default.pickBy(this.data, predicate);
    }
    /**
     * Result
     * @see _.LodashResult
     */
    result(path, $default) {
        return lodash_1.default.result(this.data, path, $default);
    }
    /**
     * Set value to path of object.
     * @method
     * @param {PathType} path
     * @param {*} [value]
     * @return {*}
     */
    set(path, value) {
        if (typeof path === "object") {
            for (const key of Object.keys(path)) {
                this.set(key, path[key]);
            }
        }
        else {
            lodash_1.default.set(this.data, path, value);
        }
        return this;
    }
    setAndGet(path, value) {
        this.set(path, value);
        return value;
    }
    /**
     * SetWith
     * @see _.LodashSetWith
     */
    setWith(path, value, customizer) {
        lodash_1.default.setWith(this.data, path, value, customizer);
        return this;
    }
    /**
     * Size
     * @see _.LodashSize
     */
    size() {
        return lodash_1.default.size(this.data);
    }
    /**
     * ToPairs
     * @see _.LodashToPairs
     */
    toPairs() {
        return lodash_1.default.toPairs(this.data);
    }
    /**
     * ToPairsIn
     * @see _.LodashToPairsIn
     */
    toPairsIn() {
        return lodash_1.default.toPairsIn(this.data);
    }
    /**
     * Transform
     * @see _.LodashTransform
     */
    transform(iteratee, accumulator) {
        // @ts-ignore
        return lodash_1.default.transform(this.data, iteratee, accumulator);
    }
    /**
     * Unset a path in object.
     * @see _.LodashUnset
     */
    unset(path) {
        lodash_1.default.unset(this.data, path);
        return this;
    }
    /**
     * Update
     * @see _.LodashUpdate
     */
    update(path, updater) {
        lodash_1.default.update(this.data, path, updater);
        return this;
    }
    /**
     * UpdateWith
     * @see _.LodashUpdateWith
     */
    updateWith(path, updater, customizer) {
        lodash_1.default.updateWith(this.data, path, updater, customizer);
        return this;
    }
    /**
     * Values
     * @see _.LodashValues
     */
    values() {
        return lodash_1.default.values(this.data);
    }
    /**
     * Values
     * @see _.LodashValues
     */
    valuesIn() {
        return lodash_1.default.valuesIn(this.data);
    }
    /**
     * Returns a path as array or creates one.
     * @param path
     * @param forceToArrayIfNotArray
     */
    array(path, forceToArrayIfNotArray) {
        const storedValue = this.get(path, undefined);
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
                    throw new Error(`Path: "${path}" exist but it's not an array.`);
                }
            }
        }
        return this.get(path);
    }
    /**
     * Get path as instance of a ObjectCollection
     * @alias ObjectCollection.newInstanceFrom
     * @param path
     * @param $default
     */
    path(path, $default) {
        return this.newInstanceFrom(path, $default);
    }
    /**
     * Returns object being used.
     *
     * if clone is `true` this.cloneDeep is used.
     * else if clone is string `!deep`
     * this.clone is used;
     * @returns {*}
     */
    return(clone, cloneDeep = true) {
        return this.all(clone, cloneDeep);
    }
    /**
     * Returns object being used.
     *
     * if clone is `true` this.cloneDeep is used.
     * else if clone is string `!deep`
     * this.clone is used;
     *
     * @alias ObjectCollection.return
     * @returns {*}
     */
    all(clone, cloneDeep = true) {
        if (clone === true) {
            return cloneDeep ? this.cloneDeep() : this.clone();
        }
        return this.data;
    }
    /**
     * Return Object to Json
     * @returns {string}
     */
    toJson(replacer = null, space = 2) {
        return JSON.stringify(this.return(), replacer, space);
    }
    /**
     * Remove null values from object
     * @param {boolean} returnThis
     */
    removeNull(returnThis = false) {
        const without = this.pickBy((value) => {
            return value !== null && value !== undefined;
        });
        return returnThis ? new ObjectCollection(without) : without;
    }
}
/**
 * Return 4.17.11
 */
ObjectCollection._ = lodash_1.default;
/**
 * @alias ObjectCollection._
 */
ObjectCollection.lodashVersion = "4.17.14";
module.exports = ObjectCollection;
//# sourceMappingURL=index.js.map