declare namespace Util {
    type IKeyReadOnly<T> = {
        readonly [P in keyof T]: T[P];
    };
    
    type IKeyPartial<T> = {
        [P in keyof T]?: T[P];
    };
    
    type IKeyRequired<T> = {
        [P in keyof T]-?: T[P];
    };
    
    type GetPropertyType<
        Obj,
        Key extends string,
        Fallback = undefined
    > = Obj extends Record<Key, infer Value> ? Value : Fallback;
    
    type ReplaceAttrTypes<Obj, KeyMap> = Omit<Obj, keyof KeyMap> & KeyMap;
}