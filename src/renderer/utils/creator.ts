import { DependencyList, ReactNode, useMemo } from 'react';
import { isEmpty } from 'lodash';
import { ColumnsType } from 'antd/lib/table';

/**
 * 创建表格列
 * @param columns 表格列数组
 * @param deps 依赖字段
 * @returns columns
 */
export function createColumns<DataType = any>(columns: ColumnsType<DataType> | Array<any>, deps: DependencyList = []): Array<any> {
	return useMemo(() => {
		return columns;
	}, deps);
}

type IMapOption = {
	value: number | string,
	label: ReactNode,
	disabled?: boolean,
	[x: string]: any;
};

type IMapType<T> = {
	[x: string]: Util.GetPropertyType<IMapOption & T, 'label'>;
};

/**
 * 同时创建map、options
 * @param arr: IMapOption
 * @returns [map, options]
 */
export function createMapOptions<T>(arr: Array<IMapOption & T>): [IMapType<T>, Array<IMapOption & T>] {
	const initMap = {};
	const initOptions = arr;
	arr.forEach(item => {
		initMap[item.value] = item.label;
	});
	return [initMap, initOptions];
}

/**
 * 根据数组创建链式对象，将value放入对象末尾
 * @param arr 链式对象数组
 * @param value 末尾值
 * @returns 对象
 */
export const createObjByArray = (arr: Array<string>, value: any) => {
	const result = {} as any;
	let next = result;
	if (!isEmpty(arr)) {
		for (let i = 0; i < arr.length; i++) {
			if (i === arr.length - 1) {
				next[arr[i]] = value;
			} else {
				next[arr[i]] = {};
				next = next[arr[i]];
			}
		}
	}
	return result;
};

/**
 * 根据字符串创建链式对象
 * @param keys 链式对象key
 * @param value 末尾值
 * @returns 对象
 */
export const createObjByKeys = (keys: string, value: any) => {
	return createObjByArray(keys.split('.'), value);
};
