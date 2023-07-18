import { useEffect } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../helpers';

const Login = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/home')
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        let username = e.target.username.value
        let password = e.target.password.value
        // post username and password to server 
        fetch('http://localhost:3001/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {
                "Content-Type": "application/json" 
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data) {
                    window.alert('wrong password hoe')
                } else {
                    document.cookie = `username=${data.username}; max-age=3600`
                    navigate('/home')
                }
            })
    }


    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="loginForm">
                <h3>SIGN IN</h3>
                <input type="text" name='username' placeholder="Username"/>
                <input type="password" name='password' placeholder="Password"/>
                <span>Signup</span>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login