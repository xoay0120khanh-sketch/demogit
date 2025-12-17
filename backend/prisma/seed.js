const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main(){
  const count = await prisma.player.count()
  if (count > 0){
    console.log('Seed: players exist, skipping')
    return
  }

  const players = [
    { name: 'Luca Tran', position: 'Forward', number: 9 },
    { name: 'Minh Hoang', position: 'Midfielder', number: 8 },
    { name: 'An Pham', position: 'Defender', number: 4 }
  ]

  for (const p of players){
    await prisma.player.create({ data: p })
  }
  console.log('Seed: inserted', players.length, 'players')
}

main()
  .catch(e=>{ console.error(e); process.exit(1) })
  .finally(()=> prisma.$disconnect())
