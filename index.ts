import _ = require("lodash");

type PathType = string | string[] | number;
type DataType = Record<string, any>;

/**
 * ObjectCollectionClass
 */
class ObjectCollection {

    /**
     * Return 4.17.11
     * @deprecated
     * Use .getLodash instead
     */
    public static _ = _;

    /**
     * @alias ObjectCollection._
     */
    public static lodashVersion = "4.17.15";

    /**
     * Get Lodash v 4.17.11
     */
    public static getLodash() {
        return _;
    }

    /**
     * Return new instance of ObjectCollection;
     * @param data
     */
    public static use(data: DataType = {}): ObjectCollection {
        return new ObjectCollection(data);
    }

    /**
     * Data being modified.
     */
    protected data: DataType;

    /**
     * Object to use or a new object will be used.
     * @param data
     */
    constructor(data: DataType = {}) {
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
    public newInstanceFrom(path: PathType, $default: any = {}): ObjectCollection {
        let pathValue = this.get(path);

        // Set path value to $default if value is undefined.
        if (pathValue === undefined) {
            pathValue = $default;
            this.set(path, pathValue);
        }

        return new ObjectCollection(pathValue);
    }

    /**
     * Return path as an instance of object validator but clones the object
     * This does not mutate main object in this.data
     * @param path
     * @param [$default]
     */
    public cloneInstanceFrom(path: PathType, $default: any = {}): ObjectCollection {
        return new ObjectCollection(_.cloneDeep(this.get(path, $default)));
    }

    /**
     * Return path as an instance of object validator but clones the object
     * This does not mutate main object in this.data
     * @alias ObjectCollection.cloneInstanceFrom
     */
    public clonePath(path: PathType, $default?: any): ObjectCollection {
        return this.cloneInstanceFrom(path, $default);
    }

    /**
     * Clone this data
     */
    public cloneThis(): ObjectCollection {
        return new ObjectCollection(this.return(true));
    }

    /**
     * Assign to object
     * @see _.assign
     */
    public assign(...sources: object[]): this {
        _.assign(this.data, ...sources);
        return this;
    }

    /**
     * AssignIn
     * @see _.assignIn
     */
    public assignIn(...sources: object[]): this {
        _.assignIn(this.data, ...sources);
        return this;
    }

    /**
     * AssignInWith
     * @see _.LodashAssignInWith
     */
    public assignInWith(sources: object[], customizer: () => any): this {
        _.assignInWith(this.data, sources, customizer);
        return this;
    }

    /**
     * AssignWith
     * @see _.LodashAssignWith
     */
    public assignWith(sources: object[], customizer: () => any): this {
        _.assignWith(this.data, sources, customizer);
        return this;
    }

    /**
     * At
     * @see _.LodashAt
     */
    public at(paths: any): any {
        return _.at(this.data, paths);
    }

    /**
     * Clone object
     * @see _.LodashClone
     */
    public clone(): any {
        return _.clone(this.data);
    }

    /**
     * Clone object deep
     * @see _.LodashCloneDeep
     */
    public cloneDeep(): any {
        return _.cloneDeep(this.data);
    }

    /**
     * Clone object deep with
     * @see _.LodashCloneDeepWith
     */
    public cloneDeepWith(customizer: () => any): any {
        return _.cloneDeepWith(this.data, customizer);
    }

    /**
     * Clone object with
     * @see _.LodashCloneWith
     */
    public cloneWith(customizer: () => any): any {
        return _.cloneWith(this.data, customizer);
    }

    /**
     * Count Keys in Object
     */
    public count(): number {
        const data = Array.isArray(this.data) ? this.data : this.keys();
        return data.length;
    }

    /**
     * Count Keys in Object
     * @alias this.count
     */
    public length(): number {
        return this.count();
    }

    /**
     * Defaults
     * @see _.LodashDefaults
     */
    public defaults(...sources: any[]): this {
        _.defaults(this.data, ...sources);
        return this;
    }

    /**
     * DefaultsDeep
     * @see _.LodashDefaultsDeep
     */
    public defaultsDeep(...sources: any[]): this {
        _.defaultsDeep(this.data, ...sources);
        return this;
    }

    /**
     * Check if path Exists in object
     */
    public exists(path: PathType) {
        if (Array.isArray(path)) {

            for (const key of path) {
                if (!this.exists(key)) {
                    return false;
                }
            }

            return true;
        }

        return this.has(path);
    }

    /**
     * Extend Object object
     * @see _.LodashExtend
     */
    public extend(...sources: object[]): this {
        return this.assign(...sources);
    }

    /**
     * Extend Object With to object
     * @see _.LodashExtendWith
     */
    public extendWith(sources: object[], customizer: () => any): this {
        return this.assignInWith(sources, customizer);
    }

    /**
     * FindKey
     * @see _.LodashFindKey
     * @param predicate
     */
    public findKey(predicate: any): any {
        return _.findKey(this.data, predicate);
    }

    /**
     * FindLastKey
     * @see _.LodashFindLastKey
     * @param predicate
     */
    public findLastKey(predicate: any): any {
        return _.findLastKey(this.data, predicate);
    }

    /**
     * ForIn
     * @see _.LodashForIn
     * @param iteratee
     */
    public forIn(iteratee: any): any {
        return _.forIn(this.data, iteratee);
    }

    /**
     * ForInRight
     * @see _.LodashForInRight
     * @param iteratee
     */
    public forInRight(iteratee: any): any {
        return _.forInRight(this.data, iteratee);
    }

    /**
     * Functions
     * @see _.LodashFunctions
     */
    public functions(): any {
        return _.functions(this.data);
    }

    /**
     * FunctionsIn
     * @see _.LodashFunctionsIn
     */
    public functionsIn(): any {
        return _.functionsIn(this.data);
    }

    /**
     * Get path of object or return.
     * @method
     * @param {string|string[]} path
     * @param {*} [$default]
     * @return {*}
     */
    public get(path: PathType | number, $default?: any): any {
        return _.get(this.data, path, $default);
    }

    /**
     * Call path in object if value is a function.
     * @method
     * @param {string|string[]} path
     * @param args
     * @return {*}
     */
    public call(path: PathType | number, args?: any): any {
        const value: (...args: any[]) => void | any = this.get(path)
        if (typeof value !== 'function') {
            throw Error(`Value of path {${path}} is not a function`)
        }

        if (args) {
            if (!Array.isArray(args))
                args = [args];

            // @ts-ignore
            return value(...args)
        } else {
            return value()
        }
    }

    /**
     * Has path in object
     * @method
     * @param {string|string[]} path
     *
     * @see _.LodashHas
     * @return {boolean}
     */
    public has(path: PathType): boolean {
        return _.has(this.data, path);
    }

    /**
     * HasIn path in object
     * @method
     * @param {string|string[]} path
     * @see _.LodashHasIn
     * @return {boolean}
     */
    public hasIn(path: PathType): boolean {
        return _.hasIn(this.data, path);
    }

    /**
     * Invert
     * @see _.LodashInvert
     */
    public invert(): any {
        return _.invert(this.data);
    }

    /**
     *  InvertBy
     *  @see _.LodashInvertBy
     */
    public invertBy(iteratee: () => any): any {
        return _.invertBy(this.data, iteratee);
    }

    /**
     * Invoke
     * @see _.LodashInvoke
     */
    public invoke(path: PathType, ...args: any[]): any {
        return _.invoke(this.data, path, ...args);
    }

    /**
     * Keys
     * @see _.LodashKeys
     */
    public keys(): any[] {
        return _.keys(this.data);
    }

    /**
     * KeysIn
     * @see _.LodashKeysIn
     */
    public keysIn(): any[] {
        return _.keysIn(this.data);
    }

    /**
     * MapKeys
     * @see _.LodashMapKeys
     */
    public mapKeys(iteratee: () => any): object {
        return _.mapKeys(this.data, iteratee);
    }

    /**
     * MapValues
     * @see _.LodashMapValues
     */
    public mapValues(iteratee: () => any): object {
        return _.mapValues(this.data, iteratee);
    }

    /**
     * Merge
     * @see _.LodashMerge
     */
    public merge(...sources: any): this {
        _.merge(this.data, ...sources);
        return this;
    }

    /**
     * MergeWith
     * @see _.LodashMergeWith
     */
    public mergeWith(source: any, customizer: any): this {
        _.mergeWith(this.data, source, customizer);
        return this;
    }

    /**
     * Omit
     * @see _.LodashOmit
     */
    public omit(paths: PathType): object {
        return _.omit(this.data, paths);
    }

    /**
     * Omit and return instance of ObjectCollection
     * @returns {ObjectCollection}
     */
    public forget(paths: PathType): ObjectCollection {
        return ObjectCollection.use(this.omit(paths));
    }

    /**
     * OmitBy
     * @see _.LodashOmitBy
     */
    public omitBy(predicate: any): object {
        return _.omitBy(this.data, predicate);
    }

    /**
     * Pick
     * @see _.LodashPick
     */
    public pick(paths: PathType): object {
        return _.pick(this.data, paths);
    }

    /**
     * Collect
     * Returns instance of ObjectCollection
     * @returns {ObjectCollection}
     */
    public collect(paths: PathType): ObjectCollection {
        return ObjectCollection.use(this.pick(paths));
    }

    /**
     * PickBy
     * @see _.LodashPickBy
     */
    public pickBy<T = DataType>(predicate: (value: any, key: string) => boolean): T {
        return _.pickBy(this.data, predicate) as T;
    }

    /**
     * Result
     * @see _.LodashResult
     */
    public result(path: PathType, $default?: any): any {
        return _.result(this.data, path, $default);
    }

    /**
     * Set value to path of object.
     * @method
     * @param {PathType} path
     * @param {*} [value]
     * @param definedOnly
     */
    public set(path: PathType | object, value?: any, definedOnly: boolean = false): this {
        if (typeof path === "object") {
            for (const key of Object.keys(path)) {
                // @ts-ignore
                this.set(key, path[key]);
            }
        } else {
            if (definedOnly && (value === undefined || value === null)) {
                return this;
            } else {
                _.set(this.data, path, value);
            }
        }

        return this;
    }

    /**
     * Set value to path of object only if value is defined.
     * @method
     * @param {PathType} path
     * @param {*} [value]
     */
    public setDefined(path: PathType | object, value?: any): this {
        return this.set(path, value, true);
    }

    /**
     * Set Paths To Same Value
     * @param paths
     * @param value
     */
    public setPathsToSameValue(paths: (string | number)[], value: any): this {
        if (!Array.isArray(paths))
            throw TypeError(`setPathsToSameValue path must be an array`);

        for (const path of paths)
            this.set(path, value);

        return this
    }

    /**
     * Set value and get value returned.
     * @param path
     * @param value
     */
    public setAndGet(path: PathType | object, value?: any): any {
        this.set(path, value);
        return value;
    }

    /**
     * SetWith
     * @see _.LodashSetWith
     */
    public setWith(path: PathType, value: any, customizer?: () => any): object {
        _.setWith(this.data, path, value, customizer);
        return this;
    }

    /**
     * Size
     * @see _.LodashSize
     */
    public size(): number {
        return _.size(this.data);
    }

    /**
     * ToPairs
     * @see _.LodashToPairs
     */
    public toPairs(): any[] {
        return _.toPairs(this.data);
    }

    /**
     * ToPairsIn
     * @see _.LodashToPairsIn
     */
    public toPairsIn(): any[] {
        return _.toPairsIn(this.data);
    }

    /**
     * Transform
     * @see _.LodashTransform
     */
    public transform(iteratee: () => any, accumulator?: any): any {
        // @ts-ignore
        return _.transform(this.data, iteratee, accumulator);
    }

    /**
     * Unset a path in object.
     * @see _.LodashUnset
     */
    public unset(path: PathType): this {
        _.unset(this.data, path);
        return this;
    }

    /**
     * Update
     * @see _.LodashUpdate
     */
    public update(path: PathType, updater: () => any): this {
        _.update(this.data, path, updater);
        return this;
    }

    /**
     * UpdateWith
     * @see _.LodashUpdateWith
     */
    public updateWith(path: PathType, updater: () => any, customizer?: () => any): this {
        _.updateWith(this.data, path, updater, customizer);
        return this;
    }

    /**
     * Values
     * @see _.LodashValues
     */
    public values(): any[] {
        return _.values(this.data);
    }

    /**
     * Values
     * @see _.LodashValues
     */
    public valuesIn(): any[] {
        return _.valuesIn(this.data);
    }

    /**
     * Returns a path as array or creates one.
     * @param path
     * @param forceToArrayIfNotArray
     */
    public array(path: PathType, forceToArrayIfNotArray?: boolean): any[] {
        const storedValue = this.get(path, undefined);

        if (storedValue === undefined) {
            this.set(path, []);
        } else {
            if (Array.isArray(storedValue)) {
                return storedValue;
            } else {
                if (forceToArrayIfNotArray) {
                    this.set(path, [storedValue]);
                } else {
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
    public path(path: PathType, $default?: object): ObjectCollection {
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
    public return(clone?: string | boolean, cloneDeep: boolean = true): any {
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
    public all(clone?: string | boolean, cloneDeep: boolean = true): any {

        if (clone === true) {
            return cloneDeep ? this.cloneDeep() : this.clone();
        }

        return this.data;
    }

    /**
     * Return Object to Json
     * @returns {string}
     */
    public toJson(replacer = null, space = 2) {
        return JSON.stringify(this.all(), replacer, space);
    }

    /**
     * Replace main data with new data.
     * @param data
     */
    public replaceData(data: any) {
        this.data = data;
        return this;
    }

    /**
     * Use removeNullOrUndefined | allWithoutNullOrUndefined
     * @param {boolean} returnThis
     * @deprecated
     */
    public removeNull(returnThis: boolean = false): object | ObjectCollection {
        const without = this.allWithoutNullOrUndefined();
        return returnThis ? this.replaceData(without) : without;
    }

    /**
     * Remove null values from object
     * @returns {ObjectCollection}
     */
    public removeNullOrUndefined(): ObjectCollection {
        return this.replaceData(this.allWithoutNullOrUndefined())
    }

    /**
     * Remove null values from object
     * @returns {{}}
     */
    public allWithoutNullOrUndefined<T = DataType>(): T {
        return this.pickBy<T>((value: any) => {
            return value !== null && value !== undefined;
        });
    }

    /**
     * Remove null values from object
     * @returns {{}}
     */
    public defined<T = DataType>(): T {
        return this.pickBy<T>((value: any) => {
            return value !== null && value !== undefined;
        });
    }

    /**
     * Get an object that sync's with a paths value.
     * @param path
     * @param def
     */
    public sync<SyncReturnType = any>(path: PathType, def?: any) {
        const self = this;
        return {
            get sync(): SyncReturnType {
                return self.get(path, def)
            },
            changeTo(value: any) {
                self.set(path, value);
                return this;
            }
        };
    }

    /**
     * Same with .sync but includes initial value;
     * @param path
     * @param def
     */
    public syncWithInitial<SyncReturnType = any>(path: PathType, def?: any) {
        const self = this;
        return {
            initial: self.get(path, def),
            get sync(): SyncReturnType {
                return self.get(path, def)
            },
            get hasChanged(): boolean {
                return this.sync !== this.initial;
            },
            changeTo(value: any) {
                self.set(path, value);
                return this;
            }
        };
    }

    /**
     * Compute Data
     * @param fn
     */
    public compute<Instance extends ObjectCollection>(this: Instance, fn: (o: Instance) => Instance): Instance {
        return fn(this)
    }
}

export = ObjectCollection;
