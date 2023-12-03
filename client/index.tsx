import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { routes } from './routes.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

const router = createBrowserRouter(routes)

const root = createRoot(document.getElementById('app') as HTMLElement)
root.render(
  <Auth0Provider
    domain="dev-2851w3ucmedk6h1w.au.auth0.com"
    clientId="GAtO6RQjYyBRdssxJoJO228PQqeydR4A"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
   // audience="https://plants/api"
  >
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Auth0Provider>
)
