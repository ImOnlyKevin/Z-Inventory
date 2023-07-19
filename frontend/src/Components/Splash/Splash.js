import { useNavigate } from "react-router-dom"

const Splash = () => {
    const navigate = useNavigate()

    return (
        <>
        Welcome to Z-Inventory!
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/signup')}>Signup</button>
        <button onClick={() => navigate('/inv')}>Browse</button>
        </>
    )
}

export default Splash