import test from "japa";
import ObjectCollection = require("../index");
import dummy from "./dummy.json";
import { Obj } from "../exports";

test.group("Static Functions", () => {
    test("use():", (assert) => {
        const obj = ObjectCollection.use(dummy);

        // check if the object is an instance of ObjectCollection
        assert.isTrue(obj instanceof ObjectCollection);

        // check if the object is the same as the dummy object
        assert.deepEqual(dummy, obj.data);
    });

    test("useCloned():", (assert) => {
        const obj = ObjectCollection.useCloned(dummy);

        // check if the object is an instance of ObjectCollection
        assert.isTrue(obj instanceof ObjectCollection);

        // update price
        obj.data.price = "$1000";

        // Since we are using a clone, the original data should not be updated
        assert.notEqual(dummy.price, obj.data.price);
    });
});

test.group("Public Functions", () => {
    test("constructor: Initialize", (assert) => {
        const obj = new ObjectCollection(dummy);

        assert.isTrue(obj instanceof ObjectCollection);
        assert.deepEqual(dummy, obj.data);

        // Compare with the original object
        assert.equal(obj.data.price, dummy.price);
    });

    test("[newInstanceFrom, path]():", (assert) => {
        const obj = new ObjectCollection(dummy);
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

    /**
     * Test data from lodash documentation
     * https://lodash.com/docs/#assign
     */
    test("assign():", (assert) => {
        const obj = Obj({ a: 0 });

        class Foo {
            a = 1;
            b!: number;
        }

        class Bar {
            c = 3;
            d!: number;
        }

        Foo.prototype.b = 2;
        Bar.prototype.d = 4;

        obj.assign(new Foo(), new Bar());

        assert.deepEqual(obj.data, { a: 1, c: 3 });
    });

    /**
     * Test data from lodash documentation
     * https://lodash.com/docs/#assignIn
     */
    test("[assignIn, extend]():", (assert) => {
        const obj = Obj({ a: 0 });

        class Foo {
            a = 1;
            b!: number;
        }

        class Bar {
            c = 3;
            d!: number;
        }

        Foo.prototype.b = 2;
        Bar.prototype.d = 4;

        obj.assignIn(new Foo(), new Bar());

        assert.deepEqual(obj.data, { a: 1, b: 2, c: 3, d: 4 });
    });

    /**
     * Test data from lodash documentation
     * https://lodash.com/docs/#assignInWith
     */
    test("[assignInWith, extendWith]():", (assert) => {
        const obj = Obj({ a: 0, c: 1 });

        function customizer(objValue: any, srcValue: any) {
            // Assign new value if the object value is undefined
            return objValue === undefined ? srcValue : objValue;
        }

        obj.assignInWith({ a: 1, b: 2, c: 3 }, customizer);

        // Only b will be assigned because a & c is already defined
        assert.deepEqual(obj.data, { a: 0, c: 1, b: 2 });
    });

    /**
     * Test data from lodash documentation
     * https://lodash.com/docs/#assignWith
     */
    test("assignWith():", (assert) => {
        const obj = Obj({ a: 0, c: 1 });

        function customizer(objValue: any, srcValue: any) {
            // Assign new value if the object value is undefined
            return objValue === undefined ? srcValue : objValue;
        }

        obj.assignWith({ a: 1, b: 2, c: 3 }, customizer);

        // Only b will be assigned because a & c is already defined
        assert.deepEqual(obj.data, { a: 0, c: 1, b: 2 });
    });

    /**
     * Test data from lodash documentation
     * https://lodash.com/docs/#at
     */
    test("at():", (assert) => {
        const obj = Obj({ a: [{ b: { c: 3 } }, 4] });

        assert.deepEqual(obj.at(["a[0].b.c", "a[1]"]), [3, 4]);
    });

    /**
     * Test data from lodash documentation
     * https://lodash.com/docs/#clone
     */
    test("clone():", (assert) => {
        const obj = Obj([{ a: 1 }, { b: 2 }]);
        const newObj = obj.clone();

        // check if obj and newObj the same i.e. cloned
        assert.deepEqual(obj.data, newObj);

        // Check if same reference
        assert.isTrue(newObj[0] === obj.data[0]);
    });

    /**
     * Test data from lodash documentation
     * https://lodash.com/docs/#cloneDeep
     */
    test("cloneDeep():", (assert) => {
        const obj = Obj([{ a: 1 }, { b: 2 }]);
        const newObj = obj.cloneDeep();

        // check if obj and newObj the same i.e. cloned
        assert.deepEqual(obj.data, newObj);

        // Check if not same reference
        assert.isFalse(newObj[0] === obj.data[0]);
    });

    test("cloneDeepWith():", (assert) => {
        const obj = Obj([{ a: 1 }, { b: 2 }]);
        const newObj = obj.cloneDeepWith((value) => {
            // change value
            if (value === 2) return 3;
        });

        // check if obj and newObj the same i.e. cloned
        assert.deepEqual(newObj, [{ a: 1 }, { b: 3 }]);
    });

    test("cloneWith():", (assert) => {
        const obj = Obj([{ a: 1 }, { b: 2 }]);

        const newObj = obj.cloneWith((value) => {
            // clone first value
            return value[0];
        });

        // check if obj and newObj the same i.e. cloned
        assert.deepEqual(newObj, obj.data[0]);
    });

    test("[count, size, length]();", (assert) => {
        const array = Obj([1, 2, 3]);
        const obj = Obj({ a: 1, b: 2, c: 3, d: 4 });

        assert.equal(array.count(), 3);
        assert.equal(array.size(), 3);
        assert.equal(array.length(), 3);

        assert.equal(obj.count(), 4);
        assert.equal(obj.size(), 4);
        assert.equal(obj.length(), 4);
    });

    test("defaults():", (assert) => {
        const obj = Obj({ a: 1 });

        obj.defaults({ b: 2 });

        assert.deepEqual(obj.data, { a: 1, b: 2 });
    });
});
