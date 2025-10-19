import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import { loadWishlist, saveWishlist } from "../utils/storage";
import { useContext } from "react";
import { MyContext } from "../context/ContextProvider";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function HomePage() {
  const [wishlist, setWishlist] = useState([]);
  const [filteredProduct, setFlteredProduct] = useState([]);
  const [searchedText, setSearchedText] = useState("");

  const { products, productLoading } = useContext(MyContext);

  useEffect(() => {
    setWishlist(loadWishlist())
  }, [])

  const handleSearch = (e) => {
    setSearchedText(e.target.value);
    const searchedProduct = products.filter((prod) =>
      prod.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFlteredProduct(searchedProduct);
  };

  function handleAddToWishlist(product) {
    if (wishlist.find(w => w.id === product.id)) return toast.warn('Already in wishlist')
    const next = [product, ...wishlist]
    setWishlist(next)
    saveWishlist(next)
    toast.success('Added to wishlist')
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      Cookies.set('token', token, {
        secure: true,
        sameSite: 'None',
        expires: 3,
      });

      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  return (
    <div className="page home-page">
      <Header showLogin={true} />

      <main className="container main fade-in">
        <section className="hero">
          <div>
            <h1 className="hero-title">Beautiful products for everyday life</h1>
            <p className="hero-sub">
              Thoughtful design, quality materials, and delightful details.
            </p>
          </div>
        </section>
        <section className="search-products">
          <input
            type="search"
            id="search-bar"
            placeholder="Search Products"
            onChange={handleSearch}
          />
        </section>
        <section className="products-section">
          <h2>Products</h2>
          {searchedText && filteredProduct.length === 0 ? (
            <p className="search-not-found">Search result not found</p>
          ) : (
            <ProductList
              products={
                filteredProduct.length === 0 ? products : filteredProduct
              }
              onAddToWishlist={handleAddToWishlist}
              productLoading={productLoading}
            />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
