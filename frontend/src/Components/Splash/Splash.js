import { useNavigate } from "react-router-dom"
import './Splash.css'

const Splash = () => {
    const navigate = useNavigate()

    return (
        <div className="splashContainer">
        <h1>Welcom to Z-Inventory!</h1>
        <div className="btnContainer">
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/signup')}>Signup</button>
            <button onClick={() => navigate('/inv')}>Browse</button>
        </div>
        </div>
    )
}

export default Splash