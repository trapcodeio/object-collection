import { test } from "./japa.js";
import { ObjectCollectionTyped } from "../index.js";

type Data = {
    name: string;
    verified: boolean;
    deep: {
        a: {
            b: {
                c: boolean;
            };
        };
    };
};

const deep = { a: { b: { c: true } } };

test.group("Typed ObjectCollection", (group) => {
    let obj: ObjectCollectionTyped<Data>;

    group.setup(() => {
        obj = new ObjectCollectionTyped<Data>({
            name: "John Doe",
            verified: false,
            deep
        });
    });

    test("getTyped():", ({ assert }) => {
        assert.equal(obj.getTyped("name"), "John Doe");
        assert.equal(obj.getTyped("verified"), false);
        assert.equal(obj.getTyped("deep.a.b.c"), deep.a.b.c);
    });

    test("setTyped():", ({ assert }) => {
        obj.setTyped("name", "Jane Doe");
        obj.setTyped("verified", true);
        obj.setTyped("deep.a.b.c", false);

        assert.equal(obj.getTyped("name"), "Jane Doe");
        assert.equal(obj.getTyped("verified"), true);
        assert.equal(obj.getTyped("deep.a.b.c"), false);
    });

    // test("inheritance", ({ assert }) => {
    //     const o = ObjectCollectionTyped.use({
    //         hello: "world",
    //         deep: { xam: 0, techie: 1 }
    //     });
    // }).pin();
});
