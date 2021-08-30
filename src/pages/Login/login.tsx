import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import IPage from '../../interfaces/page';
import userInfo from '../../config/loginInfo';

const LoginPage: React.FunctionComponent<IPage> = props => {

    let history = useHistory();

    const [credentials, setCredentials] = useState<{email:string, password:string}>({email:'',password:''});

    const updateCredentials = (name:string, value:string) => {
        setCredentials({...credentials, [name]: value});
    }
    const SignIn = () =>  {
        if (userInfo.mail === credentials.email && userInfo.password === credentials.password){
            history.push('/Posts');
        } else {
            alert('You have no access');
        }
    }

    return (
        <div className="container">
            <div className="titles">{props.name}</div>

            <div className="loginBox">
                <div className="inputBox">
                    <label htmlFor="email">Email</label>
                    <input className="inputsLogin" type="email" name="email" onChange={(e)=>updateCredentials(e.target.name, e.target.value)} placeholder="Email"/>
                </div>
                <div className="inputBox">
                    <label htmlFor="password">Password</label>
                    <input className="inputsLogin" type="password" name="password" onChange={(e)=>updateCredentials(e.target.name, e.target.value)} placeholder="Password"/>
                </div>

                <div className="loginButton" onClick={()=>SignIn()}>Enter</div>
            </div>
        </div>
    )
}

export default LoginPage;