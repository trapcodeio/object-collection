import _ = require("lodash");
declare type PathType = string | string[] | number;
declare type DataType = object | any[];
/**
 * ObjectCollectionClass
 */
declare class ObjectCollection {
    /**
     * Return 4.17.11
     * @deprecated
     * Use .getLodash instead
     */
    static _: _.LoDashStatic;
    /**
     * @alias ObjectCollection._
     */
    static lodashVersion: string;
    /**
     * Get Lodash v 4.17.11
     */
    static getLodash(): _.LoDashStatic;
    /**
     * Return new instance of ObjectCollection;
     * @param data
     */
    static use(data?: DataType): ObjectCollection;
    /**
     * Data being modified.
     */
    protected data: DataType;
    /**
     * Object to use or a new object will be used.
     * @param data
     */
    constructor(data?: DataType);
    /**
     * Return path as an instance of object validator
     * @param path
     * @param [$default]
     */
    newInstanceFrom(path: PathType, $default?: any): ObjectCollection;
    /**
     * Return path as an instance of object validator but clones the object
     * This does not mutate main object in this.data
     * @param path
     * @param [$default]
     */
    cloneInstanceFrom(path: PathType, $default?: any): ObjectCollection;
    /**
     * Return path as an instance of object validator but clones the object
     * This does not mutate main object in this.data
     * @alias ObjectCollection.cloneInstanceFrom
     */
    clonePath(path: PathType, $default?: any): ObjectCollection;
    cloneThis(): ObjectCollection;
    /**
     * Assign to object
     * @see _.assign
     */
    assign(...sources: object[]): this;
    /**
     * AssignIn
     * @see _.assignIn
     */
    assignIn(...sources: object[]): this;
    /**
     * AssignInWith
     * @see _.LodashAssignInWith
     */
    assignInWith(sources: object[], customizer: () => any): this;
    /**
     * AssignWith
     * @see _.LodashAssignWith
     */
    assignWith(sources: object[], customizer: () => any): this;
    /**
     * At
     * @see _.LodashAt
     */
    at(paths: any): any;
    /**
     * Clone object
     * @see _.LodashClone
     */
    clone(): any;
    /**
     * Clone object deep
     * @see _.LodashCloneDeep
     */
    cloneDeep(): any;
    /**
     * Clone object deep with
     * @see _.LodashCloneDeepWith
     */
    cloneDeepWith(customizer: () => any): any;
    /**
     * Clone object with
     * @see _.LodashCloneWith
     */
    cloneWith(customizer: () => any): any;
    /**
     * Count Keys in Object
     */
    count(): number;
    /**
     * Count Keys in Object
     * @alias this.count
     */
    length(): number;
    /**
     * Defaults
     * @see _.LodashDefaults
     */
    defaults(...sources: any[]): this;
    /**
     * DefaultsDeep
     * @see _.LodashDefaultsDeep
     */
    defaultsDeep(...sources: any[]): this;
    /**
     * Check if path Exists in object
     */
    exists(path: PathType): boolean;
    /**
     * Extend Object object
     * @see _.LodashExtend
     */
    extend(...sources: object[]): this;
    /**
     * Extend Object With to object
     * @see _.LodashExtendWith
     */
    extendWith(sources: object[], customizer: () => any): this;
    /**
     * FindKey
     * @see _.LodashFindKey
     * @param predicate
     */
    findKey(predicate: any): any;
    /**
     * FindLastKey
     * @see _.LodashFindLastKey
     * @param predicate
     */
    findLastKey(predicate: any): any;
    /**
     * ForIn
     * @see _.LodashForIn
     * @param iteratee
     */
    forIn(iteratee: any): any;
    /**
     * ForInRight
     * @see _.LodashForInRight
     * @param iteratee
     */
    forInRight(iteratee: any): any;
    /**
     * Functions
     * @see _.LodashFunctions
     */
    functions(): any;
    /**
     * FunctionsIn
     * @see _.LodashFunctionsIn
     */
    functionsIn(): any;
    /**
     * Get path of object or return.
     * @method
     * @param {string|string[]} path
     * @param {*} [$default]
     * @return {*}
     */
    get(path: PathType | number, $default?: any): any;
    /**
     * Call path in object if value is a function.
     * @method
     * @param {string|string[]} path
     * @param args
     * @return {*}
     */
    call(path: PathType | number, args?: any[]): any;
    /**
     * Has path in object
     * @method
     * @param {string|string[]} path
     *
     * @see _.LodashHas
     * @return {boolean}
     */
    has(path: PathType): boolean;
    /**
     * HasIn path in object
     * @method
     * @param {string|string[]} path
     * @see _.LodashHasIn
     * @return {boolean}
     */
    hasIn(path: PathType): boolean;
    /**
     * Invert
     * @see _.LodashInvert
     */
    invert(): any;
    /**
     *  InvertBy
     *  @see _.LodashInvertBy
     */
    invertBy(iteratee: () => any): any;
    /**
     * Invoke
     * @see _.LodashInvoke
     */
    invoke(path: PathType, ...args: any[]): any;
    /**
     * Keys
     * @see _.LodashKeys
     */
    keys(): any[];
    /**
     * KeysIn
     * @see _.LodashKeysIn
     */
    keysIn(): any[];
    /**
     * MapKeys
     * @see _.LodashMapKeys
     */
    mapKeys(iteratee: () => any): object;
    /**
     * MapValues
     * @see _.LodashMapValues
     */
    mapValues(iteratee: () => any): object;
    /**
     * Merge
     * @see _.LodashMerge
     */
    merge(...sources: any): this;
    /**
     * MergeWith
     * @see _.LodashMergeWith
     */
    mergeWith(source: any, customizer: any): this;
    /**
     * Omit
     * @see _.LodashOmit
     */
    omit(paths: PathType): object;
    /**
     * Omit and return instance of ObjectCollection
     * @returns {ObjectCollection}
     */
    forget(paths: PathType): ObjectCollection;
    /**
     * OmitBy
     * @see _.LodashOmitBy
     */
    omitBy(predicate: any): object;
    /**
     * Pick
     * @see _.LodashPick
     */
    pick(paths: PathType): object;
    /**
     * Collect
     * Returns instance of ObjectCollection
     * @returns {ObjectCollection}
     */
    collect(paths: PathType): ObjectCollection;
    /**
     * PickBy
     * @see _.LodashPickBy
     */
    pickBy(predicate: any): object;
    /**
     * Result
     * @see _.LodashResult
     */
    result(path: PathType, $default?: any): any;
    /**
     * Set value to path of object.
     * @method
     * @param {PathType} path
     * @param {*} [value]
     * @return {*}
     */
    set(path: PathType | object, value?: any): this;
    /**
     * Set value and get value returned.
     * @param path
     * @param value
     */
    setAndGet(path: PathType | object, value?: any): any;
    /**
     * SetWith
     * @see _.LodashSetWith
     */
    setWith(path: PathType, value: any, customizer?: () => any): object;
    /**
     * Size
     * @see _.LodashSize
     */
    size(): number;
    /**
     * ToPairs
     * @see _.LodashToPairs
     */
    toPairs(): any[];
    /**
     * ToPairsIn
     * @see _.LodashToPairsIn
     */
    toPairsIn(): any[];
    /**
     * Transform
     * @see _.LodashTransform
     */
    transform(iteratee: () => any, accumulator?: any): any;
    /**
     * Unset a path in object.
     * @see _.LodashUnset
     */
    unset(path: PathType): this;
    /**
     * Update
     * @see _.LodashUpdate
     */
    update(path: PathType, updater: () => any): this;
    /**
     * UpdateWith
     * @see _.LodashUpdateWith
     */
    updateWith(path: PathType, updater: () => any, customizer?: () => any): this;
    /**
     * Values
     * @see _.LodashValues
     */
    values(): any[];
    /**
     * Values
     * @see _.LodashValues
     */
    valuesIn(): any[];
    /**
     * Returns a path as array or creates one.
     * @param path
     * @param forceToArrayIfNotArray
     */
    array(path: PathType, forceToArrayIfNotArray?: boolean): any[];
    /**
     * Get path as instance of a ObjectCollection
     * @alias ObjectCollection.newInstanceFrom
     * @param path
     * @param $default
     */
    path(path: PathType, $default?: object): ObjectCollection;
    /**
     * Returns object being used.
     *
     * if clone is `true` this.cloneDeep is used.
     * else if clone is string `!deep`
     * this.clone is used;
     * @returns {*}
     */
    return(clone?: string | boolean, cloneDeep?: boolean): any;
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
    all(clone?: string | boolean, cloneDeep?: boolean): any;
    /**
     * Return Object to Json
     * @returns {string}
     */
    toJson(replacer?: null, space?: number): string;
    /**
     * Replace main data with new data.
     * @param data
     */
    replaceData(data: any): this;
    /**
     * Use removeNullOrUndefined | allWithoutNullOrUndefined
     * @param {boolean} returnThis
     * @deprecated
     */
    removeNull(returnThis?: boolean): object | ObjectCollection;
    /**
     * Remove null values from object
     * @returns {ObjectCollection}
     */
    removeNullOrUndefined(): ObjectCollection;
    /**
     * Remove null values from object
     * @returns {{}}
     */
    allWithoutNullOrUndefined(): object;
}
export = ObjectCollection;
