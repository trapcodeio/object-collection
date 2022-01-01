import test from "japa";
import dummy from "./dummy";
import { Obj } from "../exports";
import ObjectCollection = require("../index");

function classFooWithPrototypeC() {
    class Foo {
        a = 1;
        b = 2;
        c!: number;
    }

    // c will not be included in the result
    Foo.prototype.c = 3;

    return new Foo();
}

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

    test("get():", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });

        assert.equal(obj.get("a"), 1);
        assert.equal(obj.get("b"), 2);
        assert.equal(obj.get("c"), 3);
        assert.isUndefined(obj.get("d"), undefined);
        assert.equal(obj.get("d", "default"), "default");
    });

    test("[has, hasIn]():", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: { d: 2 } });

        assert.isTrue(obj.has("a"));
        assert.isTrue(obj.has("b"));
        assert.isTrue(obj.has("c.d"));
        assert.isFalse(obj.has("d"));

        assert.isTrue(obj.hasIn("a"));
        assert.isTrue(obj.hasIn("b"));
        assert.isTrue(obj.hasIn("c.d"));
        assert.isFalse(obj.hasIn("d"));
    });

    test("[invert, invertBy]():", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 1 });

        assert.deepEqual(obj.invert(), { "1": "c", "2": "b" });

        // InvertBy
        // => { '1': ['a', 'c'], '2': ['b'] }
        assert.deepEqual(obj.invertBy(), { "1": ["a", "c"], "2": ["b"] });

        const inverted = obj.invertBy(function (value) {
            return "group" + value;
        });

        // => { 'group1': ['a', 'c'], 'group2': ['b'] }
        assert.deepEqual(inverted, { group1: ["a", "c"], group2: ["b"] });
    });

    test("invoke():", (assert) => {
        const obj = Obj({ a: [{ b: { c: [1, 2, 3, 4] } }] });

        assert.deepEqual(obj.invoke("a[0].b.c.slice", 1, 3), [2, 3]);
    });

    test("keys():", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });
        assert.deepEqual(obj.keys(), ["a", "b", "c"]);

        // Excludes inherited properties from the result
        const obj1 = Obj(classFooWithPrototypeC());
        assert.deepEqual(obj1.keys(), ["a", "b"]);
    });

    test("keysIn():", (assert) => {
        const obj1 = Obj(classFooWithPrototypeC());
        // Includes inherited properties in the result
        assert.deepEqual(obj1.keysIn(), ["a", "b", "c"]);
    });

    test("mapKeys():", (assert) => {
        const obj = Obj({ a: 1, b: 2 });

        const keys = obj.mapKeys(function (value, key) {
            return key + value;
        });

        assert.deepEqual(keys, { a1: 1, b2: 2 });
        // => { 'a1': 1, 'b2': 2 }
    });

    test("mapValues():", (assert) => {
        const obj = Obj({ a: 1, b: 2 });

        const values = obj.mapValues(function (value) {
            return value * 2;
        });

        assert.deepEqual(values, { a: 2, b: 4 });
        // => { 'a': 2, 'b': 4 }

        const users = Obj({
            fred: { user: "fred", age: 40 },
            pebbles: { user: "pebbles", age: 1 }
        });

        // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
        assert.deepEqual(
            users.mapValues((o) => o.age),
            { fred: 40, pebbles: 1 }
        );

        // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
        assert.deepEqual(users.mapValues("age"), { fred: 40, pebbles: 1 });
    });

    test("merge():", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });

        obj.merge({ b: 4, c: 5 });

        // => { 'a': 1, 'b': 4, 'c': 5 }
        assert.deepEqual(obj.data, { a: 1, b: 4, c: 5 });
    });

    /**
     * Test data from lodash documentation
     * https://lodash.com/docs/#mergeWith
     */
    test("mergeWith():", (assert) => {
        const obj = Obj({ a: [1], b: [2] });

        const other = { a: [3], b: [4] };

        obj.mergeWith(other, (objValue, srcValue) => {
            if (Array.isArray(objValue)) {
                return objValue.concat(srcValue);
            }
        });

        assert.deepEqual(obj.data, { a: [1, 3], b: [2, 4] });
    });

    /**
     * Test data from lodash documentation
     * https://lodash.com/docs/#omit
     */
    test("omit():", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });

        const omitted = obj.omit("a", "c");

        // => { 'b': 2 }
        assert.deepEqual(omitted, { b: 2 });
    });

    test("omitBy():", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });

        const omitted = obj.omitBy(function (value, key) {
            return key === "a" || key === "c";
        });

        // => { 'b': 2 }
        assert.deepEqual(omitted, { b: 2 });
    });

    test("pick():", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });

        const picked = obj.pick(["a"]);

        // => { 'a': 1, 'c': 3 }
        assert.deepEqual(picked, { a: 1 });
    });

    test("pickBy():", (assert) => {
        const obj = Obj({ a: 1, b: "2", c: 3 });

        const picked = obj.pickBy(function (value) {
            return typeof value === "number";
        });

        assert.deepEqual(picked, { a: 1, c: 3 });
    });

    /**
     * Test data from lodash documentation
     * https://lodash.com/docs/#result
     */
    test("result():", (assert) => {
        const obj = Obj({ a: [{ b: { c1: 3, c2: () => 4 } }] });

        assert.equal(obj.result("a[0].b.c1"), 3);
        // => 3

        assert.equal(obj.result("a[0].b.c2"), 4);
        // => 4

        assert.equal(obj.result("a[0].b.c3", "default"), "default");
        // => 'default'

        assert.equal(
            obj.result("a[0].b.c3", () => "default"),
            "default"
        );
        // => 'default'
    });

    test("set():", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });

        // Set key, value args
        obj.set("b", 4);
        // => { 'a': 1, 'b': 4, 'c': 3 }
        assert.deepEqual(obj.data, { a: 1, b: 4, c: 3 });

        // Set object
        obj.set({ b: 5, c: 6 });

        // => { 'a': 1, 'b': 5, 'c': 6 }
        assert.deepEqual(obj.data, { a: 1, b: 5, c: 6 });
    });

    /**
     * Test data from lodash documentation
     * https://lodash.com/docs/#setWith
     */
    test("setWith():", (assert) => {
        const obj = Obj({}).setWith("[0][1]", "a", Object);

        assert.deepEqual(obj.data, { 0: { 1: "a" } });
    });

    test("toPairs():", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });

        // => [['a', 1], ['b', 2], ['c', 3]]
        assert.deepEqual(obj.toPairs(), [
            ["a", 1],
            ["b", 2],
            ["c", 3]
        ]);

        // Check skipping inherited properties
        const obj2 = Obj(classFooWithPrototypeC());

        assert.deepEqual(obj2.toPairs(), [
            ["a", 1],
            ["b", 2]
        ]);
    });

    test("toPairsIn():", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });

        // => [['a', 1], ['b', 2], ['c', 3]]
        assert.deepEqual(obj.toPairsIn(), [
            ["a", 1],
            ["b", 2],
            ["c", 3]
        ]);

        // Check skipping inherited properties
        const obj2 = Obj(classFooWithPrototypeC());

        assert.deepEqual(obj2.toPairsIn(), [
            ["a", 1],
            ["b", 2],
            ["c", 3]
        ]);
    });

    test("transform():", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });

        const result = obj.transform(function (result, value, key) {
            result[key] = value * 2;
        });

        // => { 'a': 2, 'b': 4, 'c': 6 }
        assert.deepEqual(result, { a: 2, b: 4, c: 6 });
    });

    test("unset():", (assert) => {
        const data = { a: 1, b: 2, c: 3 };
        const obj = Obj(data);

        obj.unset("b");

        // If @ts-ignore is removed, this will fail
        // because b is missing from the object
        // @ts-ignore
        assert.deepEqual(obj.data, { a: 1, c: 3 });

        // in order to get a good type we use the all method
        const result = obj.all<Omit<typeof data, "b">>();

        assert.deepEqual(result, { a: 1, c: 3 });
    });

    test("update():", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });

        obj.update("b", (value) => value + 1);

        // => { 'a': 1, 'b': 3, 'c': 3 }
        assert.deepEqual(obj.data, { a: 1, b: 3, c: 3 });
    });

    /**
     * Test data from lodash documentation
     * https://lodash.com/docs/#updateWith
     */
    test("updateWith():", (assert) => {
        const obj = Obj({});

        obj.updateWith("[0][1]", () => "a", Object);

        // => { 'a': 1, 'b': 6, 'c': 3 }
        assert.deepEqual(obj.data, { "0": { "1": "a" } });
    });

    test("values():", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });

        // => [1, 2, 3]
        assert.deepEqual(obj.values(), [1, 2, 3]);

        // skip inherited properties
        const obj2 = Obj(classFooWithPrototypeC());

        // => [1, 2]
        assert.deepEqual(obj2.values(), [1, 2]);
    });

    test("valuesIn():", (assert) => {
        const obj = Obj({ a: 1, b: 2, c: 3 });

        // => [1, 2, 3]
        assert.deepEqual(obj.valuesIn(), [1, 2, 3]);

        // add inherited properties
        const obj2 = Obj(classFooWithPrototypeC());

        // => [1, 2, 3]
        assert.deepEqual(obj2.valuesIn(), [1, 2, 3]);
    });
});
