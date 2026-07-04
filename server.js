require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
const connectDB = require('./config/db')
const studentRoutes = require('./routes/studentRoutes')
const authRoutes = require('./routes/authRoutes')

const dns = require('dns')
dns.setServers(["8.8.8.8", "1.1.1.1"])


if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing in .env')
  process.exit(1)
}

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET missing in .env')
  process.exit(1)
}

connectDB()

const app = express()

app.use(helmet({
  contentSecurityPolicy: false
}))
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 500 }))

app.use('/api/auth', authRoutes)
app.use('/api/students', studentRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({ message: err.message || 'Server error' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))