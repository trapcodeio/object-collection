import { diff } from "deep-object-diff";

export function isSameObject(a: Record<string, any>, b: Record<string, any>): boolean {
    return Object.keys(diff(a, b)).length === 0;
}
