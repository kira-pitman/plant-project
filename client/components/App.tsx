// import AddTodo from './AddTodo.tsx'
import { Outlet } from 'react-router-dom'
import PlantList from './PlantList'

function App() {
  return (
    <>
      <header className="header">
        <h1>It&apos;s ya bois</h1>
        <Outlet />
      </header>
      <section className="main"></section>
      <footer className="footer"></footer>
    </>
  )
}

export default App
