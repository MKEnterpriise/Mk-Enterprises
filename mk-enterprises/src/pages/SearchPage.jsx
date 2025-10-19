import React, { useContext, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import { MyContext } from "../context/ContextProvider";

export default function SearchPage() {
  const [filteredProduct, setFlteredProduct] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const { products, productLoading } = useContext(MyContext);

  const handleSearch = (e) => {
    setSearchedText(e.target.value);
    const searchedProduct = products.filter((prod) =>
      prod.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFlteredProduct(searchedProduct);
  };

  return (
    <div className="page search-page">
      <Header showLogin={true} />
      <main className="container main fade-in">
        <section>
          <h1>Search Products</h1>
          <input
            placeholder="Search products..."
            onChange={handleSearch}
            className="search-input"
            id="search-bar"
          />
          {searchedText && filteredProduct.length === 0 ? (
            <p className="search-not-found">Search result not found</p>
          ) : (
            <ProductList
              products={
                filteredProduct.length === 0 ? products : filteredProduct
              }
              productLoading={productLoading}
            />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}