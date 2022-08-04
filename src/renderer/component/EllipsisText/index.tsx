import React, { useCallback, useEffect, useRef } from 'react';
import { Tooltip } from 'antd';
import { debounce, throttle } from 'lodash';
import classNames from 'classnames';
import { IBase } from 'renderer/models/base';
import { useFetchState } from 'renderer/hooks/useFetchState';
import { getNumber } from 'renderer/utils';
import './style/index.less';

interface IEllipsisTextProps extends IBase {
    text?: string;
    lineNum?: number;
    delay?: number;
    strategy?: 'debounce' | 'throttle';
    resize?: boolean;
}

const strategyMap = { debounce, throttle };

const EllipsisText: React.FC<IEllipsisTextProps> = (props) => {
    const {
        lineNum = 1,
        className,
        style = {},
        delay = 300,
        strategy = 'debounce',
        text = '',
        resize = true
    } = props;

    const textRef = useRef(null as any);

    const [showTip, setShowTip] = useFetchState<boolean>(false);

    const updateState = () => {
        const scrollHeight = getNumber(textRef, 'current.scrollHeight', 0);
        const scrollWidth = getNumber(textRef, 'current.scrollWidth', 0);
        const clientHeight = getNumber(textRef, 'current.clientHeight', 0);
        const clientWidth = getNumber(textRef, 'current.clientWidth', 0);
        setShowTip(scrollWidth > clientWidth || scrollHeight > clientHeight);
    };

    useEffect(() => {
        updateState();
    }, [text]);

    const _onResize = useCallback(strategyMap[strategy](() => {
        updateState();
    }, delay), []);

    useEffect(() => {
        if (resize) {
            _onResize();
            window.addEventListener('resize', _onResize);
        }
        return (() => {
            resize && window.removeEventListener('resize', _onResize);
        });
    }, []);

    return (
        <Tooltip title={showTip ? text : ''}>
            <span
                ref={textRef}
                className={classNames('ellipsis-text', className)}
                style={{ WebkitLineClamp: Math.ceil(lineNum), ...style }}
            >
                {text}
            </span>
        </Tooltip>
    );
};

export default EllipsisText;