const bcrypt = require('bcryptjs')

const pwHash = (pw) => {
    return bcrypt.hashSync(pw, 12) 
  }

module.exports = {pwHash}