import { get, isArray, isEmpty, isNumber, isObject, isString, mergeWith } from 'lodash';
import { createObjByKeys } from './creator';
import { division, divisionzero, divisionPercent } from './format';
import { customizerArray } from './lodashPlus';

// 利用空字符串使得第一次匹配时匹配到泛型的声明
type IKey<T> = keyof T | '';

export function getArray<T, K = any>(obj: T, key: IKey<T>, defaultValue?: Array<K>): Array<K>;
export function getArray<K = any>(obj: any, key: string, defaultValue?: Array<K>): Array<K>;
export function getArray<K = any>(obj: any, key: any, defaultValue: Array<K> = []): Array<K> {
    const result = get(obj, key) || defaultValue;
    return isArray(result) ? result : defaultValue;
};

export function getString<T>(obj: T, key: IKey<T>, defaultValue?: string): string;
export function getString(obj: any, key: string, defaultValue?: string): string;
export function getString(obj: any, key: any, defaultValue: string = ''): string {
    const value = get(obj, key);
    const result = value == null ? defaultValue : `${value}`;
    return result;
};

export function getNumber<T>(obj: T, key: IKey<T>, defaultValue?: number): number;
export function getNumber(obj: any, key: string, defaultValue?: number): number;
export function getNumber(obj: any, key: any, defaultValue: number = 0): number {
    const value = get(obj, key);
    const result = (value == null) ? defaultValue : (isNumber(value) ? value : (parseFloat(value) || defaultValue));
    return result;
};

export function getBoolean<T>(obj: T, key: IKey<T>, defaultValue?: boolean): boolean;
export function getBoolean(obj: any, key: string, defaultValue?: boolean): boolean;
export function getBoolean(obj: any, key: any, defaultValue: boolean = false): boolean {
    const value = get(obj, key);
    const result = (value == null) ? defaultValue : !!value;
    return result;
};

export function getObject<T, K = Object>(obj: T, key: IKey<T>, defaultValue?: K): K;
export function getObject<K = Object>(obj: any, key: string, defaultValue?: K): K;
export function getObject(obj: any, key: any, defaultValue: Object = {}): Object {
    const result = get(obj, key) || defaultValue;
    return isObject(result) && !isArray(result) ? result : defaultValue;
};

export function getNumString<T>(obj: T, key: IKey<T>, defaultValue?: number): string;
export function getNumString(obj: any, key: string, defaultValue?: number): string;
export function getNumString(obj: any, key: any, defaultValue: number = 0): string {
    return division(getNumber(obj, key, defaultValue));
};

export function getNumStringZero<T>(obj: T, key: IKey<T>, defaultValue?: number): string;
export function getNumStringZero(obj: any, key: string, defaultValue?: number): string;
export function getNumStringZero(obj: any, key: any, defaultValue: number = 0): string {
    return divisionzero(getNumber(obj, key, defaultValue));
};

export function getPercent<T>(obj: T, key: IKey<T>, defaultValue?: number): string;
export function getPercent(obj: any, key: string, defaultValue?: number): string;
export function getPercent(obj: any, key: any, defaultValue: number = 0): string {
    return divisionPercent(getNumber(obj, key, defaultValue));
};

/**
 * 去除对象中值为 null 和 undefined 的属性
 *  - 不改变原对象
 * @param obj 被操作对象
 * @param deep 深度遍历
 * @returns newObj 新对象
 */
export const getEffectiveParams = (obj: any, deep = true) => {
    const result = {} as any;
    isObject(obj) && !isEmpty(obj) && Object.keys(obj).forEach(item => {
        if (obj[item] !== null && obj[item] !== undefined) {
            if (isObject(obj[item]) && !isArray(obj[item]) && deep) {
                result[item] = getEffectiveParams(obj[item], true);
            } else {
                result[item] = obj[item];
            }
        }
    });
    return result;
};

type IRule = {
    key: string;
    defaultValue?: any;
    rename?: string;
};

interface IRuleString extends IRule {
    type: 'string';
    formatter?: (value: string) => any;
}

interface IRuleNumber extends IRule {
    type: 'number';
    formatter?: (value: number) => any;
}

interface IRuleArray extends IRule {
    type: 'array';
    formatter?: (value: Array<any>) => any;
}

interface IRuleBoolean extends IRule {
    type: 'boolean';
    formatter?: (value: boolean) => any;
}

interface IRuleObject extends IRule {
    type: 'object';
    formatter?: (value: Object) => any;
}

type IRuleStrType = IRuleString | IRuleNumber | IRuleArray | IRuleBoolean | IRuleObject;

type IRuleValueType<T = any> = Util.ReplaceAttrTypes<IRuleStrType, { key: IKey<T> }>;

type IOptions = {
    // 是否与源对象合并
    toMerge?: boolean;
    // 合并的数组的字段（对象合并时数组默认不会合并而是直接替换）
    mergeArrayKeys?: Array<string>;
};

/**
 * 获取有默认值的对象（key中不可包含数组表达式）
 * @param obj 源对象
 * @param rules 规则
 * @param [options] {IOptions} 额外配置
 * @returns 安全的新对象
 */
export function getDefaultObject<T, K = any>(obj: T, rules: IRuleValueType<T>[], options?: IOptions): K;
export function getDefaultObject<T = any>(obj: any, rules: IRuleStrType[], options?: IOptions): T;
export function getDefaultObject(obj: any, rules: any[] = [], options?: IOptions): any {
    const toMerge = getBoolean(options, 'toMerge', false);
    const mergeArrayKeys = getArray(options, 'mergeArrayKeys', []);
    const resultArr = [] as any[];

    const rulesMap = {
        'array': (item: any) => getArray(obj, item.key, item.defaultValue || []),
        'boolean': (item: any) => getBoolean(obj, item.key, item.defaultValue || false),
        'number': (item: any) => getNumber(obj, item.key, item.defaultValue || 0),
        'object': (item: any) => getObject(obj, item.key, item.defaultValue || {}),
        'string': (item: any) => getString(obj, item.key, item.defaultValue || '')
    };

    rules.forEach(item => {
        let currentValue = rulesMap[item.type](item);
        item.formatter && (currentValue = item.formatter(currentValue));
        const objNew = createObjByKeys(item.rename ? item.rename : item.key, currentValue);
        resultArr.push(objNew);
    });

    const resultJson = mergeWith({}, ...resultArr, customizerArray());

    return toMerge ? mergeWith({}, obj, resultJson, customizerArray(mergeArrayKeys)) : resultJson;
};
