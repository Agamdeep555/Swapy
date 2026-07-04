const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    if (!email.endsWith('@thapar.edu')) {
      return res.status(403).json({ message: 'Only @thapar.edu email IDs are allowed' })
    }

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await User.create({ name, email, password: hashedPassword })
    const token = generateToken(user)

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    })
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email.endsWith('@thapar.edu')) {
      return res.status(403).json({ message: 'Only @thapar.edu email IDs are allowed' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const token = generateToken(user)

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { register, login }