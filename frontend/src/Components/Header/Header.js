import { useNavigate } from 'react-router-dom'
import './Header.css'

const Header = () => {
    const navigate = useNavigate()

    const logout = () => {
        document.cookie = 'username=; Max-Age=-99999999;';
        navigate('/')
    }
    

    return (
        <>
        <nav>
            <h1 className='navHeader' onClick={() => navigate('/')}>Z-Inventory</h1>
            <div className='navLinks'>
                <span>About</span>
                <span onClick={() => navigate('/login')}>Login</span>
                <span onClick={() => logout()}>Logout</span>
            </div>
        </nav>
        <div className='headerLine'></div>
        </>
    )
}

export default Header