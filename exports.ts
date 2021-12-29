import ObjectCollection from "./index";

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
