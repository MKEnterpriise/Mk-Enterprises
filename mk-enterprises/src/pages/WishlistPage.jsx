import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductList from '../components/ProductList'
import { MyContext } from '../context/ContextProvider'
import { useNavigate } from 'react-router-dom'
import { removeFromWishlist } from '../api/products/products'
import { CircleX, Eye, LoaderCircle } from 'lucide-react'

export default function WishlistPage() {
  const { wishList, userData, getWishlist, wishlistLoading } = useContext(MyContext);
  const [error, setError] = useState(null);
  const [wishlistRemoveLoading, setWishlistRemoveLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (userData?.id) {
      getWishlist()
        .catch(err => {
          setError("Failed to fetch wishlist.", err);
        });
    }
  }, [userData]);

  const handleRemoveItem = async (itemId) => {
    try {
      setWishlistRemoveLoading(true)
      await removeFromWishlist(userData?.id, itemId);
      getWishlist();
    } catch (error) {
      console.log(error);
    } finally {
      setWishlistRemoveLoading(false)
    }
  };

  return (
    <div className="page wishlist-page">
      <Header showLogin={true} />
      <main className="container main fade-in">
        <section>
          <h1>Your Wishlist</h1>
          {error && <p className="error-message">{error}</p>}
          {(wishList.length === 0 && !wishlistLoading) ? (
            <div className='empty-wishlist'>
              <p>No items in wishlist</p>
              <button onClick={() => navigate('/')} className="btn">Browse Products</button>
            </div>
          ) : (
            <div className="products-grid wishlist">
              {wishlistLoading ? (
                Array.from({ length: 3 }).map((currElem) => (
                  <div className="shimmer card" key={currElem}></div>
                ))
              ) : (
                wishList.map(item => (
                  <div key={item.id} className="wishlist-card admin-card">
                    <img src={item.photos?.[0]} alt={item.title} />
                    <div className="info">
                      <strong>{item.title}</strong>
                      <p className="short">{item.description}</p>
                      <div className="price">₹{item.price}</div>
                      <div className="wishlist-controls">
                        <button className="btn small" onClick={() => window.open(`/product/${item.id}`, '_self')}><Eye color='white'/></button>
                        <button className="btn small danger" onClick={() => handleRemoveItem(item.id)}>
                          {
                            wishlistRemoveLoading ? 
                            <LoaderCircle className="spin-animation" height={20} width={20} /> 
                            : <CircleX />
                          }
                          </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
