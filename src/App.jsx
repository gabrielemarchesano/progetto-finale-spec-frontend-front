import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import Homepage from "./pages/Homepage"
import DetailsPage from "./pages/DetailsPage"
import { GameDetailsProvider } from "./contexts/GameDetailsContext"
import { WishlistProvider } from "./contexts/WishlistContext"
import { ComparatorProvider } from "./contexts/ComparatorContext"

import * as bootstrap from "bootstrap";

function App() {

  return (
    <>
      <GameDetailsProvider>
        <WishlistProvider>
          <ComparatorProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<DefaultLayout />}>
                  <Route index element={<Homepage />} />
                  <Route path="/games/:id" element={<DetailsPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ComparatorProvider>
        </WishlistProvider>
      </GameDetailsProvider>
    </>
  )
}

export default App
