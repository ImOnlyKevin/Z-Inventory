import { useNavigate } from 'react-router-dom'
import './Header.css'

const Header = () => {
    const navigate = useNavigate()
    const name = document.cookie.split('; ').find(row => row.startsWith('name='))?.split('=')[1].split(' ')[0];

    const logout = () => {
        document.cookie = 'username=; Max-Age=-99999999;';
        document.cookie = 'name=; Max-Age=-99999999;';
        navigate('/')
    }

    const handleButton = () => {
        if (name) {
            return (
                <>
                <span onClick={() => navigate('/inventory')}>Inventory</span>
                <span onClick={() => navigate('/profile')}>Profile</span>
                <span onClick={() => logout()}>Logout</span>
                </>
            )
        } else {
            return (<span onClick={() => navigate('/login')}>Login</span>)
        }
    }
    

    return (
        <>
        <nav>
            <h1 className='navHeader' onClick={() => navigate('/')}>Z-Inventory</h1>
            <div className='navLinks'>
                <span onClick={() => navigate('/about')}>About</span>
                {handleButton()}
                
            </div>
        </nav>
        <div className='headerLine'></div>
        </>
    )
}

export default Header