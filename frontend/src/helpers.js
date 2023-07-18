
const isLoggedIn = () => {
    let username = document.cookie.split('; ').find(row => row.startsWith('username='))?.split('=')[1];
    if (username) {
        return username
    } else {
        return false
    }
}

module.exports = {isLoggedIn}