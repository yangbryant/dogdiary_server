module.exports = {
  port: parseInt(process.env.PORT, 10) || 3000,
  url: 'mongodb://127.0.0.1:27017/doggy',
  session: {
    name: 'ydt',
    secret: 'youdantao',
    cookie: {
      httponly: true,
      secure: false,
      maxAge: 365 * 24 * 60 * 60 * 1000
    }
  }
}