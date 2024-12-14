import JWT from 'jsonwebtoken'

export const sendCookieToken = (user, statusCode, message, res) => {
  // const token
  const token = JWT.sign(
    {id: user._id},
    process.env.JWT_SECRET_KEY,
    {expiresIn: Date.now() + process.env.JWT_EXPIRE_TIME}
  )
  //cookie section
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000),
    httpOnly: true,
    secure: true
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};