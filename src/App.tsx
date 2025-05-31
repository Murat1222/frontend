import { RouterProvider } from "react-router-dom"
import { router } from "./config/Router"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./api/queryClient"

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
