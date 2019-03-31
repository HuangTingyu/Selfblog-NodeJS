const loginCheck = (username, password) => {
    if (username === 'spider' && password === '123') {
        return true
    }
    return false
}

module.exports = {
    loginCheck
}