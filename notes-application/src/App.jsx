import { useState } from 'react'
import Search from './Search'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Search />
    </>
  )
}

export default App
