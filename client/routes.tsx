import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import App from './components/App'
import PlantList from './components/PlantList'
import Plant from './components/Plant'
import AddPlant from './components/AddPlant'
import EditPlant from './components/EditPlant'


export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<PlantList />} />
    <Route path="/:id" element={<Plant/>}/>
    <Route path="/add" element={<AddPlant/>}/>
    <Route path="/edit" element={<EditPlant/>}/>
  </Route>
)

export const router = createBrowserRouter(routes)
