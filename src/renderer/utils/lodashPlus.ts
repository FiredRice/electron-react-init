import { isArray, mergeWith } from 'lodash';

/**
 * mergeWidth 跳过合并数组的函数
 * @param keys 不进行跳过的数组的key
 * @returns customizer
 */
export const customizerArray = (keys: Array<string> = []) => {
    return (objValue: any, srcValue: any, key: string) => {
        if (isArray(objValue) && keys.indexOf(key) === -1) {
            return srcValue;
        }
    };
};

/**
 * 排除数组的深度合并（无需传空对象）
 * @param args 被合并数组
 * @returns 新对象
 */
export const mergeExcludeArr = <T = any>(...args: any[]): T => {
    return mergeWith({}, ...args, customizerArray());
};

/**
 * 根据 key 合并两个数组
 * @param object 
 * @param source 
 * @param key 
 */
export function concatBy<IObject extends Object, ISource extends Object>(object: IObject[], source: ISource[], key?: string): (IObject & ISource)[];
export function concatBy(object: any, source: any, key: any) {
    if (key == null) {
        return [...object, ...source];
    }
    let sourceList = [], targetList = [], swap = false;
    const map = {}, result = [];
    if (object.length > source.length) {
        sourceList = object;
        targetList = source;
    } else {
        sourceList = source;
        targetList = object;
        swap = true;
    }
    for (let i = 0, length = targetList.length; i < length; i++) {
        const value = targetList[i];
        map[value[key]] = value;
    }
    
    for (let i = 0, length = sourceList.length; i < length; i++) {
        const value = sourceList[i];
        const target = map[value[key]];
        result.push(target ? (swap ? mergeExcludeArr(target, value) : mergeExcludeArr(value, target)) : value);
    }

    return result;
}