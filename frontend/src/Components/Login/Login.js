import { useEffect } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../helpers';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/myinv')
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
                    toast.error('Invalid username/password', {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                } else {
                    document.cookie = `username=${data.username}; max-age=3600`
                    document.cookie = `name=${data.firstname} ${data.lastname}; max-age=3600`
                    navigate('/myinv');
                }
            })
    }


    return (
        <div className="loginContainer">
            <ToastContainer/>
            <form onSubmit={handleSubmit} className="loginForm">
                <h3>SIGN IN</h3>
                <input type="text" name='username' placeholder="Username"/>
                <input type="password" name='password' placeholder="Password"/>
                <span onClick={() => navigate('/signup')}>Signup</span>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login