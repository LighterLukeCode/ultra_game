import Home from "./pages/Home";
import "./scss/app.scss";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import Sort from "./components/Sort";
import Categories from "./components/Categories";
import NotFound from "./pages/NotFound";
import React from "react";

export const SearchContex = React.createContext();
function App() {
  const [searchValue, setSearchValue] = React.useState("");
  console.log(searchValue);

  return (
    <div className="wrapper">
      <SearchContex.Provider value={{ searchValue, setSearchValue }}>
        <div className="content">
          <div className="container">
            <Header />
            <Routes>
              <Route path="/" element={<Home searchValue={searchValue} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContex.Provider>
    </div>
  );
}

export default App;
