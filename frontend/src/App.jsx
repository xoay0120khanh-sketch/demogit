import React, { useEffect, useState } from 'react'

export default function App(){
  const [players, setPlayers] = useState([])
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [number, setNumber] = useState('')

  useEffect(()=>{
    fetch('/api/players').then(r=>r.json()).then(setPlayers).catch(()=>setPlayers([]))
  },[])

  const add = async (e)=>{
    e.preventDefault()
    const payload = { name, position: position || null, number: number ? parseInt(number,10) : null }
    const res = await fetch('/api/players', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) })
    if (res.ok){
      const p = await res.json()
      setPlayers(prev=>[...prev, p])
      setName(''); setPosition(''); setNumber('')
    } else {
      alert('Không thể thêm cầu thủ')
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="title">Danh sách cầu thủ</h1>
        <div className="student-card" aria-label="Thông tin sinh viên">
          <div className="student-name">Đậu Quốc Khánh_Thu2_Ca2</div>
          <div className="student-meta">
            <span className="meta-item"><strong>MSSV:</strong> DH52200867</span>
            <span className="meta-item"><strong>Lớp:</strong> D22_TH13</span>
          </div>
        </div>
      </header>

      <form onSubmit={add} className="player-form">
        <input className="input" placeholder="Tên" value={name} onChange={e=>setName(e.target.value)} required />
        <input className="input" placeholder="Vị trí" value={position} onChange={e=>setPosition(e.target.value)} />
        <input className="input small" placeholder="Số áo" value={number} onChange={e=>setNumber(e.target.value)} />
        <button className="btn">Thêm</button>
      </form>

      <ul className="player-list">
        {players.map(p=> (
          <li key={p.id} className="player-item">
            <div className="player-name">{p.name}</div>
            <div className="player-info">{p.position || '-'} • #{p.number || '-'}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

