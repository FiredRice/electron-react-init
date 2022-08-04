import { Suspense, useEffect } from 'react';
import { useIpcRenders } from 'renderer/hooks/useIpcRenders';
import { Route, useHistory } from 'react-router-dom';
import LodingCom from './LodingCom';
import Home from '../home';

const PrimaryRoutes = () => {
    const { redirectWindow } = useIpcRenders();
    const history = useHistory();

    useEffect(() => {
        redirectWindow && redirectWindow(url => {
            !!url && history.replace(url);
        });
    }, [redirectWindow]);

    return (
        <div className='main'>
            <Suspense fallback={<LodingCom />}>
                <Route path='/' exact component={LodingCom} />
                <Route path='/home' exact component={Home} />
            </Suspense>
        </div>
    );
};

export default PrimaryRoutes;
