const jwt = require('jsonwebtoken')


const generateToken =(id)=>{
    return jwt.sign({id},"nfnfkdls;aksldjfkfdls;aksjgfj238387474",{
        expiresIn: '30d'
    })

}
module.exports =generateToken;