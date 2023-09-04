import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import App from './components/App'
import PlantList from './components/PlantList'
import Plant from './components/Plant'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<PlantList />} />
    <Route path="/:id" element={<Plant/>}/>
  </Route>
)

export const router = createBrowserRouter(routes)
