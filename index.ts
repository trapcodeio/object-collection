import _ from "lodash";

/**
 * ObjectCollectionClass
 */
class ObjectCollection {

    public static use(data: object = {}): ObjectCollection {
        return new ObjectCollection(data);
    }

    protected data: object;

    /**
     * Object to use or a new object will be used.
     * @param data
     */
    constructor(data: object = {}) {
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
    public newInstanceFrom(path: string, $default?: any): ObjectCollection {
        return new ObjectCollection(this.get(path, $default));
    }

    /**
     * Return path as an instance of object validator but clones the object
     * This does not mutate main object in this.data
     * @param path
     * @param [$default]
     */
    public cloneInstanceFrom(path: string, $default?: any): ObjectCollection {
        return new ObjectCollection(_.cloneDeep(this.get(path, $default)));
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
    public get(path: string | string[], $default?: any): any {
        return _.get(this.data, path, $default);
    }

    /**
     * Has path in object
     * @method
     * @param {string|string[]} path
     *
     * @see _.LodashHas
     * @return {boolean}
     */
    public has(path: string | string[]): boolean {
        return _.has(this.data, path);
    }

    /**
     * HasIn path in object
     * @method
     * @param {string|string[]} path
     * @see _.LodashHasIn
     * @return {boolean}
     */
    public hasIn(path: string | string[]): boolean {
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
     * Set value to path of object.
     * @method
     * @param {string} path
     * @param {*} value
     * @return {*}
     */
    public set(path: string | string[] | object, value?: any): this {
        if (typeof path === "object") {

            const keys = Object.keys(path);
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                this.set(key, path[key]);
            }

        } else {
            _.set(this.data, path, value);
        }

        return this;
    }

    /**
     * Unset a path in object.
     * @method
     * @param {string} path
     * @return {boolean}
     */
    public unset(path: string) {
        return _.unset(this.data, path);
    }

    /**
     * Count Keys in Object
     */
    public count() {
        return Object.keys(this.data).length;
    }

    /**
     * Merge Object with another object
     * @param path
     * @param value
     * @param $return
     */
    public mergeWith(path: string, value: object, $return?: false): this {
        let $object = this.get(path, {});
        $object = _.merge($object, value);
        this.set(path, $object);
        return $return ? $object : this;
    }

    /**
     * Push to array in object
     * @param path
     * @param value
     */
    public push(path: string, value: any) {
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
    public addToObject(path: string, $object: {
        key: string,
        value: any,
    }) {
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
    public all() {
        return this.data;
    }

    /**
     * Get path as instance of a ObjectCollection
     * @alias ObjectCollection.newInstanceFrom
     * @param path
     * @param $default
     */
    public path(path: string, $default?: object): ObjectCollection {
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
    public return(clone?: string | boolean): any {

        if (clone === true) {
            return this.cloneDeep();
        } else if (clone === "!deep") {
            return this.clone();
        }

        return this.data;
    }
}

export = ObjectCollection;
