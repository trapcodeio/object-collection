import { ObjectCollection, ObjectCollectionTyped } from "../index.js";

type Data = {
    main: string;
    other: boolean;
    deep: {
        a: {
            b: {
                c: {};
            };
        };
    };
};

const deep = { a: { b: { c: {} } } };

const obj = new ObjectCollectionTyped<Data>({
    main: "main",
    other: false,
    deep
});

const obj2 = new ObjectCollection<Data>({
    main: "main2",
    other: true,
    deep
});

obj.getTyped("deep.a.b.c");
obj.setTyped("main", "main");
obj.setTyped("other", true);
obj.setTyped({
    main: "mainer"
});

obj2.set("deep.a.b.c", "main2");
