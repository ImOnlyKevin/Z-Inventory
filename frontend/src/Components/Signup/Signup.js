import './Signup.css'
import { useEffect } from 'react'
import { isLoggedIn } from '../../helpers'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
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
        let firstname = e.target.firstname.value
        let lastname = e.target.lastname.value
        // post username and password to server 
        fetch('http://localhost:3001/signup', {
            method: 'POST',
            body: JSON.stringify({username, password, firstname, lastname}),
            headers: {
                "Content-Type": "application/json" 
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data) {
                    window.alert('Username already taken')
                } else {
                    document.cookie = `username=${data.username}; max-age=3600`
                    document.cookie = `name=${data.firstname} ${data.lastname}; max-age=3600`
                    navigate('/myinv')
                }
            })
    }


    return (
        <div className="loginContainer">
            <form onSubmit={handleSubmit} className="loginForm">
                <h3>SIGN UP</h3>
                <input type="text" name='firstname' placeholder="First Name"/>
                <input type="text" name='lastname' placeholder="Last Name"/>
                <input type="text" name='username' placeholder="Username"/>
                <input type="password" name='password' placeholder="Password"/>
                <span onClick={() => navigate('/login')}>Login</span>
                <button type='submit'>Create Account</button>
            </form>
        </div>
    )
}

export default Signup