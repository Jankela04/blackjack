import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Game from "./Pages/Game/Game";
import Home from "./Pages/Home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/game",
        element: <Game />,
    },
]);

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
