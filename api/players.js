const fs = require('fs')
const path = require('path')
let prisma
try {
  const { PrismaClient } = require('@prisma/client')
  if (!global.__prisma) global.__prisma = new PrismaClient()
  prisma = global.__prisma
} catch (e) {
  prisma = null
}

const dataFile = path.join(__dirname, '..', 'data', 'players.json')
function readFile() {
  try {
    const raw = fs.readFileSync(dataFile, 'utf8')
    return JSON.parse(raw)
  } catch (e) {
    return []
  }
}
function writeFile(arr) {
  fs.mkdirSync(path.dirname(dataFile), { recursive: true })
  fs.writeFileSync(dataFile, JSON.stringify(arr, null, 2), 'utf8')
}

module.exports = async (req, res) => {
  try {
    // If Prisma client available and DATABASE_URL present, use Prisma
    const usePrisma = prisma && process.env.DATABASE_URL

    if (req.method === 'GET') {
      if (usePrisma) {
        const players = await prisma.player.findMany({ orderBy: { id: 'asc' } })
        return res.status(200).json(players)
      }
      const players = readFile()
      return res.status(200).json(players)
    }

    if (req.method === 'POST') {
      const { name, position, number } = req.body
      if (!name) return res.status(400).json({ error: 'name required' })

      if (usePrisma) {
        const p = await prisma.player.create({ data: { name, position: position || null, number: number || null } })
        return res.status(201).json(p)
      }

      const players = readFile()
      const id = players.length ? players[players.length - 1].id + 1 : 1
      const p = { id, name, position: position || null, number: number || null }
      players.push(p)
      writeFile(players)
      return res.status(201).json(p)
    }

    res.setHeader('Allow', 'GET, POST')
    return res.status(405).end('Method Not Allowed')
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'internal' })
  }
}
