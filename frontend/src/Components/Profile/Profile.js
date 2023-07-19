import { useState, useEffect } from "react"
import './Profile.css'

const Profile = () => {

    const [user, setUser] = useState()

    useEffect(() => {
        let username = document.cookie.split('; ').find(row => row.startsWith('username='))?.split('=')[1]
        console.log(username)
        fetch(`http://localhost:3001/user/${username}`)
            .then(res => res.json())
            .then(data => {
                if (data.length !== 1) {
                    window.alert(data)
                }
                else {
                    setUser(data[0])
                }
            })
    }, [])


    return (
        <div className="profileContainer">
            <div>
                <h4>Name</h4>
                <p>{`${user?.firstname} ${user?.lastname}`}</p>
                <h4>Username</h4>
                <p>{user?.username}</p>
                <h4>User ID</h4>
                <p>{user?.id}</p>
            </div>
        </div>
    )
}

export default Profile