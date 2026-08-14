import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import { Player } from "./pages/Player"
export const Appf = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
        },
        {
            path: "/Player",
            element: <Player />,
        }
    ])
    return <RouterProvider router={router}/>
}
