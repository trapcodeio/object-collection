import test from "japa";
import dummy from "./dummy.json";
import { Obj } from "../exports";
import ObjectCollection = require("../index");

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

    /**
     * Test data from lodash documentation
     * https://lodash.com/docs/#defaults
     */
    test("defaults():", (assert) => {
        const obj = Obj({ a: 1 });

        obj.defaults({ b: 2 });

        assert.deepEqual(obj.data, { a: 1, b: 2 });
    });

    /**
     * Test data from lodash documentation
     * https://lodash.com/docs/#defaultsDeep
     */
    test("defaultsDeep():", (assert) => {
        type obj = { a: { b: number; c?: number } };
        const obj = Obj<obj>({ a: { b: 2 } });

        obj.defaultsDeep({ a: { b: 1, c: 3 } });

        assert.deepEqual(obj.data, { a: { b: 2, c: 3 } });
    });

    test("exists():", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });

        assert.isTrue(obj.exists(["a", "b", "c"]));
        assert.isFalse(obj.exists(["a", "d"]));
    });

    /**
     * Test data from lodash documentation
     * https://lodash.com/docs/#find
     */
    test("find():", (assert) => {
        const users = Obj([
            { user: "barney", age: 36, active: true },
            { user: "fred", age: 40, active: false },
            { user: "pebbles", age: 1, active: true }
        ]);

        let barney = users.find((o) => {
            return o.age < 40;
        });

        // => object for 'barney'
        assert.deepEqual(barney, users.data[0]);

        // The `_.matches` iteratee shorthand.
        const pebbles = users.find({ age: 1, active: true });
        // => object for 'pebbles'
        assert.deepEqual(pebbles, users.data[2]);

        // The `_.matchesProperty` iteratee shorthand.
        const fred = users.find(["active", false]);
        // => object for 'fred'
        assert.deepEqual(fred, users.data[1]);

        // The `_.property` iteratee shorthand.
        barney = users.find("active");
        // => object for 'barney'
        assert.deepEqual(barney, users.data[0]);
    });

    /**
     * Test data from lodash documentation
     * https://lodash.com/docs/#filter
     */
    test("filter():", (assert) => {
        const users = Obj([
            { user: "barney", age: 36, active: true },
            { user: "fred", age: 40, active: false }
        ]);

        // using a predicate-returning function
        let fred = users.filter(function (o) {
            return !o.active;
        });
        // => objects for ['fred']
        assert.deepEqual(fred, [users.data[1]]);

        // The `_.matches` iteratee shorthand.
        let barney = users.filter({ age: 36, active: true });
        // => objects for ['barney']
        assert.deepEqual(barney, [users.data[0]]);

        // The `_.matchesProperty` iteratee shorthand.
        fred = users.filter(["active", false]);
        // => objects for ['fred']
        assert.deepEqual(fred, [users.data[1]]);

        // The `_.property` iteratee shorthand.
        barney = users.filter("active");
        // => objects for ['barney']
        assert.deepEqual(barney, [users.data[0]]);
    });

    test("map():", (assert) => {
        const users = Obj([
            { user: "barney", age: 36, active: true },
            { user: "fred", age: 40, active: false }
        ]);

        let ages = users.map((o) => {
            return o.age;
        });

        // => [36, 40]
        assert.deepEqual(ages, [36, 40]);

        // The `_.property` iteratee shorthand.
        const names = users.map("user");
        // => ['barney', 'fred']
        assert.deepEqual(names, ["barney", "fred"]);
    });

    /**
     * Test data from lodash documentation
     * https://lodash.com/docs/#findKey
     */
    test("findKey():", (assert) => {
        const users = Obj({
            barney: { age: 36, active: true },
            fred: { age: 40, active: false },
            pebbles: { age: 1, active: true }
        });

        let user = users.findKey((o) => {
            return o.age < 40;
        });

        // => 'barney' (iteration order is not guaranteed)
        assert.equal(user, "barney");

        // => pebbles
        assert.equal("pebbles", users.findKey({ age: 1, active: true }));

        // => 'fred'
        assert.equal("fred", users.findKey(["active", false]));

        // => 'barney'
        assert.equal("barney", users.findKey("active"));
    });

    /**
     * Test data from lodash documentation
     * https://lodash.com/docs/#findLastKey
     */
    test("findLastKey():", (assert) => {
        const users = Obj({
            barney: { age: 36, active: true },
            fred: { age: 40, active: false },
            pebbles: { age: 1, active: true }
        });

        let user = users.findLastKey((o) => {
            return o.age < 40;
        });

        // => 'pebbles' (iteration order is not guaranteed)
        assert.equal("pebbles", user);

        // => 'pebbles'
        assert.equal("barney", users.findLastKey({ age: 36, active: true }));

        // => 'fred'
        assert.equal("fred", users.findLastKey(["active", false]));

        // => 'barney'
        assert.equal("pebbles", users.findLastKey("active"));
    });

    test("[forIn, forInWith]():", (assert) => {
        const users = Obj({
            barney: { age: 36, active: true },
            fred: { age: 40, active: false },
            pebbles: { age: 1, active: true }
        });

        let result = "";
        users.forIn((value, key) => {
            result += key;
        });

        // => 'barneyfredpebbles' (iteration order is not guaranteed)
        assert.equal("barneyfredpebbles", result);

        result = "";
        users.forInRight((value, key) => {
            result += key;
        });

        // => 'pebblesfredbarney' (iteration order is not guaranteed)
        assert.equal("pebblesfredbarney", result);
    });

    test("[functions, functionsIn()]:", (assert) => {
        class Foo {
            a = () => "a";
            b = () => "b";
            c!: () => "c";
        }

        // c will not be included in the result
        Foo.prototype.c = () => "c";

        const obj = Obj(new Foo());
        assert.deepEqual(obj.functions(), ["a", "b"]);

        // c is included in the result
        assert.deepEqual(obj.functionsIn(), ["a", "b", "c"]);
    });

    test("get()", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });

        assert.equal(obj.get("a"), 1);
        assert.equal(obj.get("b"), 2);
        assert.equal(obj.get("c"), 3);
        assert.isUndefined(obj.get("d"), undefined);
        assert.equal(obj.get("d", "default"), "default");
    });

    test("has()", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: { d: 2 } });

        assert.isTrue(obj.has("a"));
        assert.isTrue(obj.has("b"));
        assert.isTrue(obj.has("c.d"));
        assert.isFalse(obj.has("d"));
    });
});

test.group("Extra Functions", () => {
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
});
