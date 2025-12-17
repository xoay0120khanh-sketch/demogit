require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const app = express()
app.use(cors())
app.use(express.json())

const prisma = new PrismaClient()

app.get('/api/players', async (req, res) => {
  const players = await prisma.player.findMany({ orderBy: { id: 'asc' } })
  res.json(players)
})

app.post('/api/players', async (req, res) => {
  const { name, position, number } = req.body
  if (!name) return res.status(400).json({ error: 'name required' })
  const p = await prisma.player.create({ data: { name, position: position || null, number: number || null } })
  res.status(201).json(p)
})

const port = process.env.PORT || 4000
app.listen(port, ()=> console.log(`Backend listening on ${port}`))
