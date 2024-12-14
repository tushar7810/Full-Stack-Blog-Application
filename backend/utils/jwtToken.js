import JWT from 'jsonwebtoken'

export const sendCookieToken = (user, statusCode, message, res) => {
  // const user = 
  const token = JWT.sign(
    {id: user._id},
    process.env.JWT_SECRET_KEY
  )
  
  const options = {
    expiresIn: Date.now() + process.env.JWT_EXPIRE_TIME
    ,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};