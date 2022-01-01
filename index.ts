import _ from "./lodash";
import {
    OC_KeysOrString,
    OC_PathsArrayType,
    OC_PathType,
    OC_PredicateObjectFnType,
    OC_PredicateObjectType,
    OC_PredicateType,
    OC_SyncPath,
    OC_SyncPathWithInitial,
    OC_TObject
} from "./types";

// type ExtendsObject<T, T2> = T extends OC_TObject ? T : T2;
/**
 * ObjectCollectionClass
 */
class ObjectCollection<
    DataType extends OC_TObject = OC_TObject
    // CustomType = Record<string, any>
> {
    /**
     * Return new instance of ObjectCollection;
     * @param data
     */
    public static use<DT>(data: DT = {} as DT) {
        return new ObjectCollection<DT>(data);
    }

    /**
     * Return new cloned instance of ObjectCollection;
     * @param data
     */
    public static useCloned<DT>(data: DT) {
        return this.use<DT>(_.cloneDeep(data));
    }

    /**
     * Data being modified.
     */
    public data: DataType & OC_TObject;

    /**
     * Object to use or a new object will be used.
     * @param data
     */
    constructor(data: DataType = {} as DataType) {
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
    public newInstanceFrom<T>(path: OC_PathType<DataType>, $default: T = {} as T) {
        let pathValue = this.get(path);

        // Set path value to $default if value is undefined.
        if (pathValue === undefined) {
            pathValue = $default;
            this.set(path, pathValue);
        }

        return new ObjectCollection<T>(pathValue);
    }

    /**
     * Return path as an instance of object validator but clones the object
     * This does not mutate main object in this.data
     * @param path
     * @param [$default]
     */
    public cloneInstanceFrom<T>(path: OC_PathType<DataType>, $default: T = {} as T) {
        return new ObjectCollection<T>(_.cloneDeep(this.get(path, $default)));
    }

    /**
     * Return path as an instance of object validator but clones the object
     * This does not mutate main object in this.data
     * @alias cloneInstanceFrom
     */
    public clonePath<T>(path: OC_PathType, $default?: T) {
        return this.cloneInstanceFrom<T>(path, $default);
    }

    /**
     * Clone this data
     */
    public cloneThis<T extends OC_TObject = DataType>() {
        return new ObjectCollection(this.return<T>(true, true));
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
    public assignIn(...sources: any[]): this {
        _.assignIn(this.data, ...sources);
        return this;
    }

    /**
     * AssignInWith
     * @see _.LodashAssignInWith
     */
    public assignInWith<Source>(sources: Source, customizer: _.AssignCustomizer): this {
        _.assignInWith(this.data, sources, customizer);
        return this;
    }

    /**
     * AssignWith
     * @see _.LodashAssignWith
     */
    public assignWith<Source>(sources: Source, customizer: _.AssignCustomizer): this {
        _.assignWith(this.data, sources, customizer);
        return this;
    }

    /**
     * At
     * @see _.LodashAt
     */
    public at<Result = any>(paths: string[] | number[]) {
        return _.at<Result>(this.data, paths);
    }

    /**
     * Clone object
     * @see _.LodashClone
     */
    public clone<Result extends DataType>() {
        return _.clone(this.data) as Result;
    }

    /**
     * Clone object deep
     * @see _.LodashCloneDeep
     */
    public cloneDeep<Result extends DataType>() {
        return _.cloneDeep(this.data) as Result;
    }

    /**
     * Clone object deep with
     * @see _.LodashCloneDeepWith
     */
    public cloneDeepWith<T = any>(customizer: _.CloneDeepWithCustomizer<DataType>) {
        return _.cloneDeepWith(this.data, customizer) as T;
    }

    /**
     * Clone object with
     * @see _.LodashCloneWith
     */
    public cloneWith<Result>(customizer: _.CloneWithCustomizer<DataType, Result>) {
        return _.cloneWith(this.data, customizer);
    }

    /**
     * Count Keys in Object
     */
    public count() {
        return _.size(this.data);
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
    public exists(path: OC_PathType<DataType> | OC_PathType<DataType>[]) {
        if (Array.isArray(path)) {
            for (const key of path) {
                if (!this.exists(key)) {
                    return false;
                }
            }

            return true;
        }

        return this.has(path as string);
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
     * Find in object
     * @param predicate
     * @param fromIndex
     */
    public find(predicate: OC_PredicateType<DataType>, fromIndex?: number) {
        return _.find(this.data, predicate as any, fromIndex);
    }

    /**
     * Filter in object
     * @param predicate
     */
    public filter(predicate: OC_PredicateType<DataType>) {
        return _.filter(this.data, predicate as any);
    }

    /**
     * Map in object
     * @param iteratee
     */
    public map<Result = any>(iteratee: OC_PredicateType<DataType, Result>) {
        return _.map(this.data, iteratee as any) as unknown as Result[];
    }

    /**
     * FindKey
     * @see _.LodashFindKey
     * @param predicate
     */
    public findKey<Result = any>(predicate: OC_PredicateObjectType<DataType, Result>) {
        return _.findKey(this.data, predicate as any);
    }

    /**
     * FindLastKey
     * @see _.LodashFindLastKey
     * @param predicate
     */
    public findLastKey<Result = any>(
        predicate: OC_PredicateObjectType<DataType, Result>
    ) {
        return _.findLastKey(this.data, predicate as any);
    }

    /**
     * ForIn
     * @see _.LodashForIn
     * @param iteratee
     */
    public forIn(iteratee: OC_PredicateObjectFnType<DataType>) {
        return _.forIn(this.data, iteratee);
    }

    /**
     * ForInRight
     * @see _.LodashForInRight
     * @param iteratee
     */
    public forInRight(iteratee: OC_PredicateObjectFnType<DataType>): any {
        return _.forInRight(this.data, iteratee);
    }

    /**
     * Functions
     * @see _.LodashFunctions
     */
    public functions() {
        return _.functions(this.data);
    }

    /**
     * FunctionsIn
     * @see _.LodashFunctionsIn
     */
    public functionsIn() {
        return _.functionsIn(this.data);
    }

    /**
     * Get path of object or return.
     * @method
     * @param {string|string[]} path
     * @param {*} [$default]
     */
    public get<Result = any>(path: OC_PathType<DataType>, $default?: Result) {
        if (typeof path !== "number" && (path as string).length === 0) {
            return $default as Result;
        }

        return _.get(this.data, path, $default) as Result;
    }

    /**
     * Call path in object if value is a function.
     * @method
     * @param {string|string[]} path
     * @param args
     * @return {*}
     */
    public call<Result = any>(
        path: OC_PathType<DataType> | number,
        args?: any[]
    ): Result {
        const value: ((...args: any[]) => void | any) | undefined = this.get(path);

        if (typeof value !== "function") {
            throw Error(`Value of path {${String(path)}} is not a function`);
        }

        if (args) {
            if (!Array.isArray(args)) args = [args];
            return value(...args);
        } else {
            return value();
        }
    }

    /**
     * Has path in object
     * @method
     * @param {string|string[]} path
     *
     * @see _.LodashHas
     * @return {boolean}.
     */
    public has(path: OC_PathType) {
        return _.has(this.data, path);
    }

    /**
     * HasIn path in object
     * @method
     * @param {string|string[]} path
     * @see _.LodashHasIn
     * @return {boolean}
     */
    public hasIn(path: OC_PathType): boolean {
        return _.hasIn(this.data, path);
    }

    /**
     * Invert
     * @see _.LodashInvert
     */
    public invert() {
        return _.invert(this.data);
    }

    /**
     *  InvertBy
     *  @see _.LodashInvertBy
     */
    public invertBy(iteratee?: _.ValueIteratee<DataType[keyof DataType]>) {
        return _.invertBy(this.data, iteratee);
    }

    /**
     * Invoke
     * @see _.LodashInvoke
     */
    public invoke(path: OC_PathType, ...args: any[]) {
        return _.invoke(this.data, path, ...args);
    }

    /**
     * Keys
     * @see _.LodashKeys
     */
    public keys() {
        return _.keys(this.data) as Array<keyof DataType> | string[];
    }

    /**
     * KeysIn
     * @see _.LodashKeysIn
     */
    public keysIn() {
        return _.keysIn(this.data) as Array<keyof DataType> | string[];
    }

    /**
     * MapKeys
     * @see _.LodashMapKeys
     */
    public mapKeys<Result = any>(iteratee: OC_PredicateObjectFnType<DataType>): Result {
        return _.mapKeys(this.data, iteratee) as unknown as Result;
    }

    /**
     * MapValues
     * @see _.LodashMapValues
     */
    public mapValues<Result = any>(iteratee: OC_PredicateObjectType<DataType>): Result {
        return _.mapValues(this.data, iteratee as any) as Result;
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
    public mergeWith(source: any, customizer: _.MergeWithCustomizer): this {
        _.mergeWith(this.data, source, customizer);
        return this;
    }

    /**
     * Omit
     * @see _.LodashOmit
     */
    public omit<Result = Record<string, any>>(...paths: OC_PathType<DataType>[]) {
        return _.omit(this.data, ...paths) as Partial<DataType> & Result;
    }

    /**
     * Omit and return instance of ObjectCollection
     * @returns {ObjectCollection}
     */
    public forget<T extends string | keyof DataType>(
        paths: T
    ): ObjectCollection<Omit<DataType, T> | OC_TObject>;

    public forget<T extends OC_PathsArrayType<DataType>>(paths: T) {
        return ObjectCollection.use(
            this.omit(paths) as Omit<DataType, T[number]> | OC_TObject
        );
    }

    /**
     * OmitBy
     * @see _.LodashOmitBy
     */
    public omitBy<Result = Record<string, any>>(
        predicate: OC_PredicateObjectType<DataType>
    ) {
        return _.omitBy(this.data, predicate) as Partial<DataType> & Result;
    }

    /**
     * Pick
     * @see _.LodashPick
     */
    public pick<Result extends Record<string, any>, T extends OC_KeysOrString<DataType>>(
        paths: T
    ): Pick<DataType, T> & Result;

    public pick<
        Result extends Record<string, any>,
        T extends OC_PathsArrayType<DataType>
    >(paths: T): Pick<DataType, T[number]> & Result;

    public pick(paths: OC_PathType<DataType>) {
        return _.pick(this.data, paths);
    }

    /**
     * Collect
     * Returns instance of ObjectCollection
     * @returns {ObjectCollection}
     */
    public collect<
        Result extends Record<string, any>,
        T extends OC_KeysOrString<DataType>
    >(paths: T): ObjectCollection<Pick<DataType, T> & Result>;

    public collect<
        Result extends Record<string, any>,
        T extends OC_PathsArrayType<DataType>
    >(paths: T): ObjectCollection<Pick<DataType, T[number]> & Result>;

    public collect(paths: OC_PathsArrayType<DataType>) {
        return ObjectCollection.use(this.pick(paths));
    }

    /**
     * PickBy
     * @see _.LodashPickBy
     */
    public pickBy<Result extends OC_TObject>(
        predicate: OC_PredicateObjectType<DataType>
    ) {
        return _.pickBy(this.data, predicate) as Partial<DataType> & Result;
    }

    /**
     * Result
     * @see _.LodashResult
     */
    public result<Result>(
        path: OC_PathType<DataType>,
        $default?: Result | ((...args: any[]) => Result)
    ) {
        return _.result(this.data, path, $default);
    }

    /**
     * Set value to path of object.
     * @method
     * @param {OC_PathType} path
     * @param {*} [value]
     * @param definedOnly
     */
    public set(
        path: OC_PathType<DataType> | Record<OC_KeysOrString<DataType>, any>,
        value?: any,
        definedOnly: boolean = false
    ): this {
        if (typeof path === "object") {
            for (const key of Object.keys(path)) {
                this.set(key, (path as any)[key], definedOnly);
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
     * @param {OC_PathType} path
     * @param {*} [value]
     */
    public setDefined(
        path: OC_PathType<DataType> | Record<OC_KeysOrString<DataType>, any>,
        value?: any
    ): this {
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

        for (const path of paths) this.set(path, value);

        return this;
    }

    /**
     * Set value and get value returned.
     * @param path
     * @param value
     */
    public setAndGet(path: OC_PathType | object, value?: any): any {
        this.set(path, value);
        return value;
    }

    /**
     * SetWith
     * @see _.LodashSetWith
     */
    public setWith(
        path: OC_PathType,
        value: any,
        customizer?: _.SetWithCustomizer<DataType>
    ) {
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
    public toPairsIn() {
        return _.toPairsIn(this.data);
    }

    /**
     * Transform
     * @see _.LodashTransform
     */
    public transform<Result extends Record<string, any>>(
        iteratee: (...args: any[]) => any,
        accumulator?: any
    ) {
        return _.transform(this.data, iteratee, accumulator) as Partial<DataType> &
            Result;
    }

    /**
     * Unset a path in object.
     * @see _.LodashUnset
     */
    public unset(path: OC_PathType<DataType>) {
        _.unset(this.data, path);
        return this;
    }

    /**
     * Update
     * @see _.LodashUpdate
     */
    public update(path: OC_PathType, updater: (value: any) => any): this {
        _.update(this.data, path, updater);
        return this;
    }

    /**
     * UpdateWith
     * @see _.LodashUpdateWith
     */
    public updateWith(
        path: OC_PathType,
        updater: (oldValue: any) => any,
        customizer?: _.SetWithCustomizer<DataType>
    ): this {
        _.updateWith(this.data, path, updater, customizer);
        return this;
    }

    /**
     * Values
     * @see _.LodashValues
     */
    public values() {
        return _.values(this.data);
    }

    /**
     * Values
     * @see _.LodashValues
     */
    public valuesIn() {
        return _.valuesIn(this.data);
    }

    /**
     * Returns a path as array or creates one.
     * @param path
     * @param forceToArrayIfNotArray
     */
    public array<Result>(path: OC_PathType<DataType>, forceToArrayIfNotArray?: boolean) {
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
                    throw new Error(
                        `Path: "${String(path)}" exist but it's not an array.`
                    );
                }
            }
        }

        return this.get(path) as Result[];
    }

    /**
     * Get path as instance of a ObjectCollection
     * @alias ObjectCollection.newInstanceFrom
     * @param path
     * @param $default
     */
    public path(path: OC_PathType, $default?: object): ObjectCollection {
        return this.newInstanceFrom(path, $default);
    }

    /**
     * Returns object being used.
     *
     * if clone is `true` this.cloneDeep is used.
     * else if clone is string `!deep`
     * this.clone is used;
     */
    public return<Result extends OC_TObject = DataType>(
        clone?: boolean,
        cloneDeep: boolean = true
    ) {
        return this.all<Result>(clone, cloneDeep);
    }

    /**
     * Returns object being used.
     *
     * if clone is `true` this.cloneDeep is used.
     * else if clone is string `!deep`
     * this.clone is used;
     *
     * @alias ObjectCollection.return
     */
    public all<Result extends OC_TObject = DataType>(
        clone?: boolean,
        cloneDeep: boolean = true
    ) {
        if (clone === true) {
            return (cloneDeep ? this.cloneDeep() : this.clone()) as Result;
        }

        return this.data as Result;
    }

    /**
     * Return Object to Json
     * @returns {string}
     */
    public toJson(replacer = null, space = 0): string {
        return JSON.stringify(this.all(), replacer, space);
    }

    /**
     * Replace main data with new data.
     */
    public replaceData(data: any) {
        this.data = data;
        return this;
    }

    /**
     * Remove null values from object
     */
    public removeNullOrUndefined() {
        return this.replaceData(this.allWithoutNullOrUndefined());
    }

    /**
     * Remove null values from object
     */
    public allWithoutNullOrUndefined<T = Partial<DataType>>(): T {
        return this.pickBy<T>((value: any) => {
            return value !== null && value !== undefined;
        });
    }

    /**
     * Remove null values from object
     */
    public defined<T extends OC_TObject = DataType>() {
        return this.pickBy<T>((value: any) => {
            return value !== null && value !== undefined;
        });
    }

    /**
     * Get an object that sync's with a paths value.
     * @param path
     * @param def
     */
    public sync<SyncReturnType = any>(path: OC_PathType, def?: SyncReturnType) {
        const self = this;
        return {
            get sync() {
                return self.get(path, def);
            },

            changeTo(value) {
                self.set(path, value);
                return this;
            }
        } as OC_SyncPath<SyncReturnType>;
    }

    /**
     * Same with .sync but includes initial value;
     * @param path
     * @param def
     */
    public syncWithInitial<SyncReturnType = any>(path: OC_PathType, def?: any) {
        const self = this;
        return {
            initial: self.get(path, def),
            get sync(): SyncReturnType {
                return self.get(path, def);
            },
            get hasChanged(): boolean {
                return this.sync !== this.initial;
            },
            changeTo(value) {
                self.set(path, value);
                return this;
            }
        } as OC_SyncPathWithInitial<SyncReturnType>;
    }

    /**
     * Compute Data
     */
    public compute<Result = any>(fn: (o: ObjectCollection<DataType>) => Result) {
        return fn(this);
    }

    /**
     * Compute Data Async
     */
    public async computeAsync<Result = any>(
        fn: (o: ObjectCollection<DataType>) => Promise<Result>
    ) {
        return await fn(this);
    }
}

export = ObjectCollection;
