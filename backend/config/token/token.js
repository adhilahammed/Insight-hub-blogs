const jwt=require('jsonwebtoken')


const createToken=id=>{
    return jwt.sign({id},process.env.JWT_KEY,{expiresIn:'10d'})
}

module.exports=createToken