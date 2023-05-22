import { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavigationBar from "./components/Navbar/Navbar";
import ProductListing from "./pages/productListing/productListing";
import ProductDetailPage from "./pages/productDetail/productDetail";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    fetch(`mock_data.json`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setCurrentPage(1);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <BrowserRouter>
        <NavigationBar setSearchTerm={setSearchTerm} itemCount={itemCount} />
        <Routes>
          <Route
            path="/"
            element={
              <ProductListing
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                products={products}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            }
          />
          <Route
            path="/:id"
            element={
              <ProductDetailPage
                itemCount={itemCount}
                setItemCount={setItemCount}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
