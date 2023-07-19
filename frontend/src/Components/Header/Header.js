import { useNavigate } from 'react-router-dom'
import './Header.css'
import { useEffect, useState } from 'react';

const Header = () => {
    const navigate = useNavigate()
    const [name, setName] = useState()

    useEffect(() => {
        setName(document.cookie.split('; ').find(row => row.startsWith('name='))?.split('=')[1].split(' ')[0])
    }, [document.cookie])

    const isActive = (input) => {
        let activeUrl = window.location.href.split('/').pop()
        if (input === activeUrl) {
            return 'active'
        } else {
            return 'inactive'
        }
    }

    const logout = () => {
        document.cookie = 'username=; Max-Age=-99999999;';
        document.cookie = 'name=; Max-Age=-99999999;';
        setName('')
        navigate('/')
    }

    const handleButton = () => {
        if (name) {
            return (
                <>
                <span className={isActive('myinv')} onClick={() => navigate('/myinv')}>My Items</span>
                <span className={isActive('profile')} onClick={() => navigate('/profile')}>Profile</span>
                <span className={isActive('logout')} onClick={() => logout()}>Logout</span>
                </>
            )
        } else {
            return (<span className={isActive('login')} onClick={() => navigate('/login')}>Login</span>)
        }
    }
    

    return (
        <>
        <nav>
            <h1 className='navHeader' onClick={() => navigate('/')}>Z-Inventory</h1>
            <div className='navLinks'>
                <span className={isActive('about')} onClick={() => navigate('/about')}>About</span>
                <span className={isActive('inv')} onClick={() => navigate('/inv')}>Items</span>
                {handleButton()}
                
            </div>
        </nav>
        <div className='headerLine'></div>
        </>
    )
}

export default Header