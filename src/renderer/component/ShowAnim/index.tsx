import React, { CSSProperties, useRef } from 'react';
import classNames from 'classnames';
import { IBase } from 'renderer/models/base';
import { getNumber } from 'renderer/utils';
import './style/index.less';

interface IShowAnimProps extends IBase {
    visible?: boolean;
    direction?: 'vertical' | 'horizontal' | 'opacity';
}

type IStyleMap = {
    [x: string]: CSSProperties;
}

const ShowAnim: React.FC<IShowAnimProps> = (props) => {
    const {
        visible = false,
        className,
        direction = 'vertical',
        style = {},
        children
    } = props;

    const divRef = useRef(null as any);

    const scrollHeight = getNumber(divRef, 'current.scrollHeight');

    const styleMap = {
        vertical: {
            height: visible ? scrollHeight : 0
        },
        horizontal: {
            width: visible ? '100%' : 0
        },
        opacity: {
            opacity: visible ? 1 : 0,
            zIndex: visible ? -1 : 1
        }
    } as IStyleMap;

    return (
        <div
            ref={divRef}
            className={classNames('showAnim', className)}
            style={{ ...styleMap[direction], ...style }}
        >
            {children}
        </div>
    );
};

export default ShowAnim;