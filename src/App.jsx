import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('[APP] montou — App.jsx carregado')
    return () => console.log('[APP] desmontou')
  }, [])

  const handleClick = (ev) => {
    console.log('[APP] botão clicado — evento:', ev?.type)
    setCount((prev) => {
      const next = prev + 1
      console.log('[APP] contador atualizado:', prev, '→', next)
      return next
    })
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>
      <h2 className="subtitle">Shara e Pamella </h2>


      <div className="card">
        <button
          data-testid="debug-counter-button"
          onClick={handleClick}
          style={{
            padding: '12px 20px',
            borderRadius: 8,
            background: '#111',
            color: '#fff',
            border: '1px solid #222',
            cursor: 'pointer',
            fontWeight: '700'
          }}
        >
          Contagem é <strong style={{ marginLeft: 8 }}>{count}</strong>
        </button>

      </div>

      <p className="read-the-docs">
        Clique nos logos para saber mais.
      </p>
    </>
  )
}

export default App
