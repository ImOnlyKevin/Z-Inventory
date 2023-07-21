import './Signup.css'
import { useEffect } from 'react'
import { isLoggedIn } from '../../helpers'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

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
        let passwordCheck = e.target.passwordCheck.value
        let firstname = e.target.firstname.value
        let lastname = e.target.lastname.value

        if (password.length < 10) {
            toast.error('Password not long enough (10)', {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-error'
            })
            return
        }

        if (password !== passwordCheck) {
            toast.error('Password must match', {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-error'
            })
            return
        }

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
                    toast.error('Username already in use', {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
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
                <input type="text" name='firstname' placeholder="First Name" required/>
                <input type="text" name='lastname' placeholder="Last Name" required/>
                <input type="text" name='username' placeholder="Username" required/>
                <input type="password" name='password' placeholder="Password" required/>
                <input type="password" name='passwordCheck' placeholder="Confirm Password" required/>
                <span onClick={() => navigate('/login')}>Login</span>
                <button type='submit'>Create Account</button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup