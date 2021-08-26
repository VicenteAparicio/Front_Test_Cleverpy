import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    const [message, setMessage] = useState<string>('');


    return (
        <div className="nav">
            <Link className="links" to="/">home</Link>
            <Link className="links" to="/">posts</Link>
            <Link className="links" to="/">login</Link>
        </div>
    );
}

export default Nav;