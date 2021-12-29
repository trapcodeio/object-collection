import test from "japa";
import ObjectCollection from "..";
import { Obj } from "../exports";

test(`function: Obj`, (assert) => {
    const obj = { a: 1, b: 2, c: 3 };

    const $obj = Obj(obj);

    // check if the object is an instance of ObjectCollection
    assert.isTrue($obj instanceof ObjectCollection);

    // check if the instance has the correct properties
    assert.equal($obj.data.a, 1);
    assert.equal($obj.data.b, 2);
    assert.equal($obj.data.c, 3);
});
