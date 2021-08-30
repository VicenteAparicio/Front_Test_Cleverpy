import React from 'react';
import IPage from '../../interfaces/page';
import './login.scss';

const LoginPage: React.FunctionComponent<IPage> = props => {

    return (
        <div className="container">
            <div className="titles">{props.name}</div>
        </div>
    )
}

export default LoginPage;