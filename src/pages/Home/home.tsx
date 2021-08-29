import React from 'react';
import IPage from '../../interfaces/page';
import './home.scss';

const HomePage: React.FunctionComponent<IPage> = props => {


    return (
        <div className="container">
            <div className="titles">{props.name}</div>
        </div>
    )
}

export default HomePage;