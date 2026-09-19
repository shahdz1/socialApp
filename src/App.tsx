import './App.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './Routes/route'

function App() {

  return (
    <>
        <div>
          <RouterProvider router={routes}/>
        </div>
    </>
  )
}

export default App
