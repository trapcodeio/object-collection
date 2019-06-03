"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const lodash_1 = __importDefault(require("lodash"));
/**
 * ObjectCollectionClass
 */
class ObjectCollection {
    static use(data = {}) {
        return new ObjectCollection(data);
    }
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
     * Set value to path of object.
     * @method
     * @param {string} path
     * @param {*} value
     * @return {*}
     */
    set(path, value) {
        if (typeof path === "object") {
            const keys = Object.keys(path);
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                this.set(key, path[key]);
            }
        }
        else {
            lodash_1.default.set(this.data, path, value);
        }
        return this;
    }
    /**
     * Unset a path in object.
     * @method
     * @param {string} path
     * @return {boolean}
     */
    unset(path) {
        return lodash_1.default.unset(this.data, path);
    }
    /**
     * Count Keys in Object
     */
    count() {
        return Object.keys(this.data).length;
    }
    /**
     * Merge Object with another object
     * @param path
     * @param value
     * @param $return
     */
    mergeWith(path, value, $return) {
        let $object = this.get(path, {});
        $object = lodash_1.default.merge($object, value);
        this.set(path, $object);
        return $return ? $object : this;
    }
    /**
     * Push to array in object
     * @param path
     * @param value
     */
    push(path, value) {
        const storedValue = this.get(path, []);
        if (Array.isArray(storedValue)) {
            const pushed = storedValue.push(value);
            this.set(path, storedValue);
            return pushed;
        }
        return false;
    }
    /**
     * Add Key and Value to Object
     * @param path
     * @param $object
     */
    addToObject(path, $object) {
        const storedValue = this.get(path, {});
        if (typeof storedValue === "object") {
            storedValue[$object.key] = $object.value;
            this.set(path, storedValue);
        }
        return false;
    }
    /**
     * ![Deprecated] Use .return();
     * @returns {*}
     * @deprecated
     */
    all() {
        return this.data;
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
    return(clone) {
        if (clone === true) {
            return this.cloneDeep();
        }
        else if (clone === "!deep") {
            return this.clone();
        }
        return this.data;
    }
}
module.exports = ObjectCollection;
//# sourceMappingURL=index.js.map