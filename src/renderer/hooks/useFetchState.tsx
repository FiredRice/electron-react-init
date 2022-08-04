import { Draft } from 'immer';
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';

/**
 * 能避免内存泄漏的 useState
 * - 开销相对较大，仅在可能出现内存泄漏时使用
 * - 使用方式同 useState
 */
export function useFetchState<T>(value: T): [T, Dispatch<SetStateAction<T>>] {
    const focus = useRef(true);
    const [state, setState] = useState<T>(value);

    useEffect(() => {
        return () => {
            focus.current = false;
        };
    }, []);

    const setFetchState = useCallback((params: SetStateAction<T>) => {
        focus.current && setState(params);
    }, []);

    return [state, setFetchState];
}

/**
 * 能避免内存泄漏的 useImmer
 * - 开销相对较大，仅在可能出现内存泄漏时使用
 * - 使用方式同 useImmer
 */
export function useFetchImmer<S = any>(value: S | (() => S)): [S, (f: (draft: Draft<S>) => void | S) => void] {
    const focus = useRef(true);
    const [state, setState] = useImmer(value);

    useEffect(() => {
        return () => {
            focus.current = false;
        };
    }, []);

    const setFetchState = useCallback((params: (draft: Draft<S>) => void | S) => {
        focus.current && setState(params);
    }, []);

    return [state, setFetchState];
}