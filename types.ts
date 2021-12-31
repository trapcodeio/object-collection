export type OC_TObject = Record<any, any>;

export type OC_PathType<T = Record<string, any>> =
    | keyof T
    | Array<keyof T>
    | string
    | string[]
    | number;

export type OC_PathsArrayType<T extends OC_TObject> = (keyof T)[] | string[] | number[];

export type OC_PredicateFnType<T = any, R = any> = (
    value: FlatArray<T, number> & OC_TObject,
    index: keyof T
) => R;

export type OC_PredicateObjectFnType<T = Record<string, any>, R = any> = (
    value: T[keyof T] & OC_TObject,
    index: keyof T
) => R;

export type OC_PredicateType<T = any, R = any> =
    | string
    | symbol
    | number
    | OC_TObject
    | OC_PredicateFnType<T, R>;

export type OC_PredicateObjectType<T = any, R = any> =
    | string
    | symbol
    | number
    | OC_TObject
    | OC_PredicateObjectFnType<T, R>;

export type OC_KeysOrString<T> = keyof T | string | number;

export type OC_SyncPath<SyncReturnType = any> = {
    sync: SyncReturnType;
    changeTo: (value: SyncReturnType) => OC_SyncPath<SyncReturnType>;
};

export type OC_SyncPathWithInitial<SyncReturnType = any> = {
    sync: SyncReturnType;
    initial: SyncReturnType;
    hasChanged: boolean;
    changeTo: (value: SyncReturnType) => OC_SyncPathWithInitial<SyncReturnType>;
};
