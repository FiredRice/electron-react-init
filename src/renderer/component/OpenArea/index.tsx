import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { get } from 'lodash';
import TextButton from '../TextButton';
import classNames from 'classnames';
import './style.less';

interface IOpenAreaProps {
    value?: boolean | undefined,
    minHeight?: number,
    maxHeight?: number | undefined,
    className?: string | undefined,
    style?: CSSProperties | undefined,
    openButton?: React.ReactNode | undefined,
    onOpenClick?: (value?: boolean) => void
}

const OpenArea: React.FC<IOpenAreaProps> = ({ value, minHeight = 22, maxHeight, className, style = {}, openButton, onOpenClick, children }) => {
    const initClass = classNames('open-area', className);
    const initStyle = openButton === undefined ? { paddingRight: 40 } : {};

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const areaRef = useRef(null as any);

    const trueHeight = get(areaRef, 'current.scrollHeight', 0);

    // 展开判断
    const openJudge = value === undefined ? isOpen : value;

    // 真实高度与显示高度差超过10像素方可展开
    const max = openJudge ? (trueHeight && (trueHeight - minHeight > 10) ? trueHeight : minHeight) : minHeight;

    const onClick = () => {
        setIsOpen(!isOpen);
        areaRef && (areaRef.current['scrollTop'] = 0);
        onOpenClick && onOpenClick(!openJudge);
    }

    // 强制重新渲染获取真实高度
    useEffect(() => {
        setIsOpen(false);
    }, []);

    return (
        <div className={initClass} style={Object.assign({}, initStyle, style)}>
            <div
                className='open-area-box'
                ref={areaRef}
                style={{
                    maxHeight: maxHeight ? Math.min(maxHeight, max) : max,
                    overflowY: openJudge && maxHeight && Math.min(maxHeight, max) === maxHeight ? 'scroll' : 'hidden'
                }}
            >
                {children}
            </div>
            {
                openButton === undefined && trueHeight && (trueHeight - minHeight > 10) &&
                <TextButton className='open-area-open' onClick={onClick} >{openJudge ? '收起↑' : '展开↓'}</TextButton>
            }
        </div>
    )
}

export default OpenArea;