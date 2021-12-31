/**
 *  This file contains tests of helper instance methods not related to lodash
 */
import test from "japa";
import dummy from "./dummy.json";
import { Obj } from "../exports";
import ObjectCollection from "..";

test.group("Extra Functions", () => {
    test("[newInstanceFrom, path]():", (assert) => {
        const obj = new ObjectCollection({ dummy });
        const newObj = obj.newInstanceFrom("users");

        // check if new instance matches "users" in the original instance
        assert.deepEqual(obj.data.users, newObj.data);
    });

    test("[newInstanceFrom, path](): where path does not exist", (assert) => {
        const obj = new ObjectCollection(dummy);
        const newObj = obj.newInstanceFrom("notFound");

        // if path is not found, path will be created with {}
        assert.isTrue(dummy.hasOwnProperty("notFound"));
        assert.deepEqual(obj.data.notFound, newObj.data);

        // will also delete the path {dummy.notFound}
        delete obj.data.notFound;
    });

    test("[newInstanceFrom, path](): where path does not exist but with default value", (assert) => {
        const obj = new ObjectCollection(dummy);
        const newObj = obj.newInstanceFrom("notFound", { error: "404" });

        // if path is not found, path will be created with {}
        assert.isTrue(dummy.hasOwnProperty("notFound"));
        // compare with the default value
        assert.equal(obj.data.notFound.error, newObj.data.error);
        // will also delete the path {dummy.notFound}
        delete obj.data.notFound;
    });

    test("[cloneInstanceFrom, clonePath]():", (assert) => {
        const obj = new ObjectCollection(dummy);
        const newObj = obj.cloneInstanceFrom<typeof dummy["coordinates"]>("coordinates");

        // update x coordinate
        newObj.data.x = 36;

        // Since we are using a clone, the original value of path "coordinates" should not be updated
        assert.notEqual(obj.data.coordinates.x, newObj.data.x);
        // but obj data and dummy data should be the same left unchanged
        assert.equal(obj.data.coordinates.x, dummy.coordinates.x);
    });

    test("cloneThis():", (assert) => {
        const obj = new ObjectCollection(dummy);
        const newObj = obj.cloneThis();

        // update x coordinate
        newObj.data.coordinates.x = 37;

        // Since we are using a clone, the original value of path "coordinates" should not be updated
        assert.notEqual(obj.data.coordinates.x, newObj.data.coordinates.x);
    });

    test("call():", (assert) => {
        const obj = Obj({
            hello: "world",
            foo: function (...args: string[]) {
                return args.concat("fromFoo");
            }
        });

        const result = obj.call("foo", ["bar"]);

        assert.deepEqual(result, ["bar", "fromFoo"]);
    });

    test("forget():", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 }).forget("b");

        // => { 'a': 1, 'c': 3 }
        assert.deepEqual(obj.data, { a: 1, c: 3 });
    });

    test("collect():", (assert) => {
        const obj = Obj(dummy).collect(["users", "price"]);

        // obj is an instance of Obj
        assert.isTrue(obj instanceof ObjectCollection);

        // checks keys of the object
        assert.deepEqual(obj.keys(), ["users", "price"]);
    });

    test("setDefined():", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });

        // Set defined values
        obj.setDefined({ b: 4, c: undefined, d: undefined, e: null });

        // => { 'a': 1, 'b': 4, 'c': 3 }
        assert.deepEqual(obj.data, { a: 1, b: 4, c: 3 });
    });

    test("setPathsToSameValue():", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });

        obj.setPathsToSameValue(["a", "b", "c"], 4);

        // => { 'a': 4, 'b': 4, 'c': 4 }
        assert.deepEqual(obj.data, { a: 4, b: 4, c: 4 });
    });

    test("setAndGet():", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });

        const result = obj.setAndGet("b", 4);

        // => { 'a': 1, 'b': 4, 'c': 3 }
        assert.deepEqual(obj.data, { a: 1, b: 4, c: 3 });

        // => 4
        assert.equal(result, 4);
    });

    test.failing("array(): fail if value is  not an array", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });

        assert.deepEqual(obj.array("c"), [3]);
    });

    test("array(): pass if value is an or not array", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });

        assert.deepEqual(obj.array("c", true), [3]);
    });

    /**
     * return, all
     * returns the data the collection holds
     */
    test("[return, all]():", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });

        assert.deepEqual(obj.all(), obj.data);
        assert.deepEqual(obj.return(), obj.data);

        const inherit = obj.all();

        inherit.a = 6;

        assert.equal(obj.data.a, 6);
    });

    /**
     * return, all (Cloned)
     * returns the data the collection holds
     */
    test("[return, all](): Clone", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });

        assert.deepEqual(obj.all(true), obj.data);
        assert.deepEqual(obj.return(true), obj.data);

        // set first argumnet to clone
        const inherit = obj.all(true);

        inherit.a = 6;

        assert.equal(obj.data.a, 1);
    });

    /**
     * return, all (Cloned)
     * returns the data the collection holds
     */
    test("[return, all](): Clone Deep", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });

        assert.deepEqual(obj.all(true, true), obj.data);
        assert.deepEqual(obj.return(true, true), obj.data);

        // set first argumnet to clone
        const inherit = obj.all(true, true);

        inherit.a = 6;

        assert.equal(obj.data.a, 1);
    });

    test("toJson():", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });

        assert.equal(obj.toJson(), JSON.stringify(obj.data));

        // with JSON.stringify like options
        assert.equal(obj.toJson(null, 2), JSON.stringify(obj.data, null, 2));
    });

    test("replaceData():", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });

        obj.replaceData({ a: 6, b: 7, c: 8 });

        assert.deepEqual(obj.data, { a: 6, b: 7, c: 8 });
    });

    test("removeNullOrUndefined():", (assert) => {
        const obj = Obj({ a: 1, b: null, c: 3, d: undefined, e: 4 });

        obj.removeNullOrUndefined();

        assert.deepEqual(obj.data as Record<string, any>, { a: 1, c: 3, e: 4 });
    });

    test("allWithoutNullOrUndefined():", (assert) => {
        const obj = Obj({ a: 1, b: null, c: 3, d: undefined, e: 4 });

        assert.deepEqual(obj.allWithoutNullOrUndefined(), { a: 1, c: 3, e: 4 });
    });
});
