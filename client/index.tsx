import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { router } from './routes.tsx'
import { RouterProvider } from 'react-router-dom'

import App from './components/App.tsx'

const queryClient = new QueryClient()
// const router = createBrowserRouter(routes)

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
      {/* <App /> */}
      <ReactQueryDevtools />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
})
