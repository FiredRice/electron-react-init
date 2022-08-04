import React, { CSSProperties } from 'react';
import { TabPaneProps, Tabs, TabsProps } from 'antd';
import { get } from 'lodash';
import { ISuperTabOptions } from ".";
import classNames from 'classnames';
import './style.less';

export interface SuperTabsProps extends TabsProps {
    options?: ISuperTabOptions | undefined,
    tabStyle?: CSSProperties | undefined,
    tabClassName?: string | undefined,
    planProps?: TabPaneProps,
    extra?: React.ReactNode
}

const Main: React.FC<SuperTabsProps> = ({ options, planProps, className, style, tabClassName, tabStyle, extra, children, ...tabProps }) => {
    const initClass = classNames('super-tabs-block', className);
    const tabClass = classNames('ssuper-tabs', tabClassName);

    return (
        <div className={initClass} style={style}>
            <Tabs {...tabProps} className={tabClass} style={tabStyle}>
                {
                    options ? options.map(item => {
                        return (
                            <Tabs.TabPane {...planProps} tab={item.label} key={item.value} disabled={get(item, 'disabled', false)} />
                        )
                    }) : children
                }
            </Tabs>
            <div>
                {extra}
            </div>
        </div>
    )
}

export default Main;