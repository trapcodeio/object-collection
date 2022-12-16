import { ObjectCollection, ObjectCollectionTyped } from "./index.js";
import type {OC_TObject} from "./types.js";

/**
 * Shortcut for ObjectCollection.
 * @param obj
 *
 * @example
 * const obj = Obj({foo: "bar"});
 * // is same as
 * const obj = new ObjectCollection({foo: "bar"});
 */
export function Obj<DT extends OC_TObject>(obj: DT = {} as DT) {
    return new ObjectCollection<DT>(obj);
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
export function ObjTyped<DT extends OC_TObject>(obj: DT = {} as DT) {
    return new ObjectCollectionTyped<DT>(obj);
}
