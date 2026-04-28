import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import Homepage from "./pages/Homepage"
import DetailsPage from "./pages/DetailsPage"
import { GameDetailsProvider } from "./contexts/GameDetailsContext"

function App() {

  return (
    <>
    <GameDetailsProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route index element={<Homepage />} />
              <Route path="/games/:id" element={<DetailsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </GameDetailsProvider>
    </>
  )
}

export default App
