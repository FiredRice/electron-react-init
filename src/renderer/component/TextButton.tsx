import React from 'react';
import { Button, ButtonProps } from 'antd';

const TextButton: React.FC<Omit<ButtonProps, 'type'>> = ({ style = {}, children, ...otherProps }) => {
    return (
        <Button 
            type='link'
            style={{ padding: 0, ...style }}
            {...otherProps}
        >
            {children}
        </Button>
    )
}

export default TextButton;