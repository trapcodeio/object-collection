import { ObjectCollection, ObjectCollectionTyped } from "./index.js";

/**
 * Shortcut for ObjectCollection.
 * @param obj
 *
 * @example
 * const obj = Obj({foo: "bar"});
 * // is same as
 * const obj = new ObjectCollection({foo: "bar"});
 */
export function Obj<DT>(obj: DT) {
    return ObjectCollection.use<DT>(obj);
}

/**
 * Shortcut for ObjectCollectionTyped.
 * @param obj
 *
 * @example
 * const obj = ObjTyped({foo: "bar"});
 * // is same as
 * const obj = new ObjectCollectionTyped({foo: "bar"});
 */
export function ObjTyped<DT>(obj: DT) {
    return ObjectCollectionTyped.use<DT>(obj);
}
