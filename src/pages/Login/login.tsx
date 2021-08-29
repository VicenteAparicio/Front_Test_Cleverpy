import React, { useEffect } from 'react';
import IPage from '../../interfaces/page';
import logging from '../../config/logging';
import './login.scss';

const LoginPage: React.FunctionComponent<IPage> = props => {
    useEffect(() => {
        logging.info(`Loading ${props.name}`);
    }, [props.name])

    return (
        <div className="container">
            <div className="titles">{props.name}</div>
        </div>
    )
}

export default LoginPage;