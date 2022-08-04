import React, { useCallback } from 'react';
import { PageHeader, PageHeaderProps, Space, Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import './style/index.less';

interface IPageProps extends PageHeaderProps {
    goBack?: boolean;
    loading?: boolean;
    // 当 header 下面没有间距时将该值设置为 false
    spaceTop?: boolean;
}

const Page: React.FC<IPageProps> = React.memo((props) => {
    const {
        goBack = false,
        loading = false,
        spaceTop = true,
        children,
        onBack,
        ...otherProps
    } = props;

    const history = useHistory();

    const onGoBack = useCallback((e) => {
        onBack && onBack(e);
        history.goBack();
    }, [onBack]);

    return (
        <div className='page'>
            <Space 
                direction='vertical' 
                style={{ width: '100%', paddingTop: 10 }}
            >
                {
                    goBack ? (
                        <PageHeader
                            ghost={false}
                            onBack={onGoBack}
                            {...otherProps}
                        />
                    ) : (
                        <PageHeader
                            ghost={false}
                            {...otherProps}
                        />
                    )
                }
                <div style={{ marginTop: spaceTop ? -15 : 0 }}>
                    <Spin spinning={loading}>
                        <Space direction='vertical' style={{ width: '100%' }}>
                            {children}
                        </Space>
                    </Spin>
                </div>
            </Space>
        </div>
    );
});

export default Page;
