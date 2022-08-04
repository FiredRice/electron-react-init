import React, { CSSProperties } from 'react';
import { Avatar, AvatarProps, Skeleton } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { BLUE } from 'renderer/utils';

interface IHeadImg extends Omit<AvatarProps, 'src' | 'size'> {
    loading?: boolean,
    src?: string | null | undefined,
    size?: 'large' | 'small' | 'default' | number,
    allowDrage?: boolean,
}

// 禁止拖拽css
const disabledDrage = {
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
    pointerEvents: 'none'
} as CSSProperties;

const baseStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
} as CSSProperties;

const HeadImg: React.FC<IHeadImg> = ({ loading = false, src = '', size = 'default', icon = <UserOutlined />, shape = 'square', allowDrage = false, style = {}, ...otherProps }) => {
    return (
        <>
            {
                loading ? (
                    <Skeleton.Avatar active shape={shape} size={size} style={style} />
                ) : (
                    src ? (
                        <Avatar
                            {...otherProps}
                            src={src}
                            shape={shape}
                            size={size}
                            style={Object.assign({} , baseStyle, !allowDrage ? disabledDrage : {}, style)}
                        />
                    ) : (
                        <Avatar
                            {...otherProps}
                            icon={icon}
                            shape={shape}
                            size={size}
                            style={Object.assign({}, baseStyle, { backgroundColor: BLUE }, style)}
                        />
                    )
                )
            }
        </>
    )
}

export default HeadImg;
