import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import App from './components/App'
import PlantList from './components/PlantList'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<PlantList />} />
  </Route>
)

export const router = createBrowserRouter(routes)
