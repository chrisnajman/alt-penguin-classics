import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom"
import { coversLoader, getCoverDetail } from "./utils/loaders"
import Layout from "./layout/Layout"
import Covers from "./pages/Covers"
import Cover from "./pages/Cover"
import About from "./pages/About"
import Error from "./pages/Error"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
    >
      <Route
        index
        element={<Covers />}
        loader={coversLoader}
        errorElement={<Error />}
      />
      <Route
        path="/:cover"
        element={<Cover />}
        loader={getCoverDetail}
        errorElement={<Error />}
      />
      <Route
        path="about"
        element={<About />}
        loader={coversLoader}
        errorElement={<Error />}
      />
    </Route>
  ),
  { basename: "/alt-penguin-classics/" }
)

function App() {
  return <RouterProvider router={router} />
}

export default App
