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

/**
 * Typescript object path crawler
 * Gotten from:
 * https://www.typescriptlang.org/play?ts=4.1.0-dev.20200921#code/C4TwDgpgBACghsAFgSQLZgDYB4AqAaKAaSggA9gIA7AEwGcoBrCEAewDMocA+KAXgCgoREuSp0otYACcAlpQDmgqAH5OAbUIBdERRr0AShADGLKdSyTZCgnEoguSoapwbtZXeICCUqXBAAZGSYsW3tHIRVhAB8oAAMAEgBvQgBfADok+CQ0TFxXAgBRUiMMAFdqCCwmVg4XLQJq9ihQtU0uLhTY8KEALmi4pNSMxKyUdGw6zQbmJsmOroioPsIlPsoIADcIKQBufn5QSFgERFweXmPs8dxpms4eGMbavYPwaFGANTgyyvxYHTE9FGZ3OShgAL0A0ScjY2yI6SSMLhhkknSUqmI7kBjBmtXCqhRwAh4mBc26kU+31Kv3yUEJDkWvSg6y2UnCa0221W-yxkKenHx6hgmnZzM5u32FRKcCk0DYpUoRmAMhYlCg8ggwBuPNEkNJ7QAFCwAEYAKz6fzAJz6MAAlDaTl8ftqYFwXiZKJIoCbTcYiRdEko2DIpJIAHJwVAQPoAIgAIjIIPIWDG8EoMHBw5Ho1AYwAJOAAL1TSjgGr6AGYAAxpoRgKQsX1K2h9NThRLM7OxwxwBgyYCpqAe6QyY2lYCmFtQABsAA4oClaxEO5Qu7mAMKqyQICCD4eyMcT0N9ACMACYF0uRSlmvQPZJ3VuiRsqdALhrgEazX6CDH642-VoNIY1tPYgA
 */
type PathImpl<T, Key extends keyof T> = Key extends string
    ? T[Key] extends Record<string, any>
        ?
              | `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>> & string}`
              | `${Key}.${Exclude<keyof T[Key], keyof any[]> & string}`
        : never
    : never;

type PathImpl2<T> = PathImpl<T, keyof T> | keyof T;

export type Path<T> = PathImpl2<T> extends string | keyof T ? PathImpl2<T> : keyof T;
export type PathValue<T, P extends Path<T>> = P extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
        ? Rest extends Path<T[Key]>
            ? PathValue<T[Key], Rest>
            : never
        : never
    : P extends keyof T
    ? T[P]
    : never;
