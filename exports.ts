import ObjectCollection from "./index";

export function Obj(obj: Record<string, any>) {
    return ObjectCollection.use(obj);
}
