export async function fetchPlayers(){
  const r = await fetch('/api/players')
  return r.json()
}

export async function addPlayer(payload){
  const r = await fetch('/api/players', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
  return r.json()
}
