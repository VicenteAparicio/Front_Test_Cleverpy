import React from 'react';
import { BrowserRouter, Route, Switch, RouteComponentProps } from 'react-router-dom';
import routes from './config/routes';
import Nav from './components/Nav/nav';
import './App.scss';

const App: React.FunctionComponent<{}> = props => {

    return (
        <div>
            <BrowserRouter>
            <Nav />
                <Switch>
                    {routes.map((route, index) => {
                        return (
                            <Route key={index} path={route.path} exact={route.exact}
                                render={(props: RouteComponentProps<{}>) => (
                                    <route.component
                                        name={route.name} {...props} {...route.props}
                                    />
                                )}
                            />
                        );
                    })}
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;