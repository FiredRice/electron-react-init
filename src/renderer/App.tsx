import { MemoryRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NotFound from './pages/404/NotFound';
import PrimaryRoutes from './pages/layouts/PrimaryRouter';
import './styles/index.less';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path='/404' exact component={NotFound} />
                <Route path='/' component={PrimaryRoutes} />
                <Redirect to='/' />
            </Switch>
        </Router>
    );
};

export default App;
