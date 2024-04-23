import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CitiesTablePage from "./components/CitiesTablePage";
import WeatherPage from "./components/WeatherPage";

const App: React.FC = () => {
  return (
    <div className="maincontainer ">
      <div className="container content_container">
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/" element={<CitiesTablePage />} />
              <Route
                path="/weather/:cityName/:lat/:lon"
                element={<WeatherPage />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
