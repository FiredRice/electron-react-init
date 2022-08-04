import React from 'react';
import classNames from 'classnames';
import { IBase } from 'renderer/models/base';
import './style/index.less';

interface IDisabledAreaProps extends IBase {
    disabled?: boolean;
}

const DisabledArea: React.FC<IDisabledAreaProps> = (props) => {
    const { disabled = false, className, children, style = {} } = props;

    const onClick = (e: any) => {
        disabled && e.stopPropagation();
    };

    return (
        <div
            className={classNames(disabled ? 'disabled-area-box-disabled' : '', className)}
            style={style}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default DisabledArea;
