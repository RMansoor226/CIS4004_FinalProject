require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')

const app = express()

app.use(cors())
app.use(express.json())

// CONNECT TO MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

// USER SCHEMA
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String
})

const User = mongoose.model("User", UserSchema)

// REGISTER
app.post('/register', async (req, res) => {
  const { username, password } = req.body

  const exists = await User.findOne({ username })
  if (exists) return res.json({ message: "Username already exists" })

  const hash = await bcrypt.hash(password, 10)

  const newUser = new User({
    username,
    passwordHash: hash
  })

  await newUser.save()

  res.json({ message: "User created" })
})

// LOGIN
app.post('/login', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  if (!user) return res.json({ message: "Invalid login" })

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) return res.json({ message: "Invalid login" })

  res.json({ message: "Login successful" })
})

app.listen(5000, () => console.log("Server running on port 5000"))