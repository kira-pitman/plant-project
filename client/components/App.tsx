import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

function App() {
  return (
    <>
      <header className="header">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1>Botanical Buds</h1>
        </Link>
        <Outlet />
      </header>
      <section className="main"></section>
      <footer className="footer"></footer>
    </>
  )
}

export default App
