import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Nav from './Nav'

function App() {
  return (
    <>
      <header className="header">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1>Botanical Buds</h1>
        </Link>
        <Nav/>
        <Outlet />
      </header>
      <section className="main"></section>
      <footer>
        {' '}
        <p className="copyright">Copyright 2023 Kira Pitman</p>
      </footer>
    </>
  )
}

export default App
