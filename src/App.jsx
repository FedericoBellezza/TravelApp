import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context import
import { TripContextProvider } from "./context/TripsContext";

// pages import
import HomePage from "./pages/HomePage";
import TripsPage from "./pages/Trips/TripsPage";
import ShowPage from "./pages/Trips/ShowPage";

// layout import
import DefaulLayout from "./layouts/DefaultLayout";

function App() {
  return (
    <TripContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaulLayout />}>
            <Route index element={<HomePage />} />
            <Route path="trips" element={<TripsPage />} />
            <Route path="trips/:id" element={<ShowPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TripContextProvider>
  );
}

export default App;
