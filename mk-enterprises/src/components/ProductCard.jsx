import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, LoaderCircle, ShoppingCart } from 'lucide-react'
import { useContext } from 'react'
import { MyContext } from '../context/ContextProvider'
import HandleWishListHook from '../hooks/HandleWishlist'

export default function ProductCard({ product }) {

  const {userData, isLoggedIn} = useContext(MyContext);
  const {wishlistLoading, inWishList, handleWishlist} = HandleWishListHook(userData?.id, product?.id)
  
  return (
    <article className="product-card scale-up">
      <div className="card-media">
        <img src={product.photos?.[0] || ''} alt={product.title} loading="lazy" />
        <div className="price-badge">₹{product.price}</div>
        <div className="card-overlay">
          {
            isLoggedIn && 
              <button className="icon small" title="Add to wishlist" onClick={e => { e.stopPropagation(); handleWishlist() }}>
              {
                wishlistLoading ? 
                <LoaderCircle className="spin-animation" height={20} width={20} /> : 
                <Heart size={16} color={inWishList ? 'red' : "white"}/>
              }
            </button>
          }
          <Link to={`/product/${product.id}`} className="view-btn">View</Link>
        </div>
      </div>

      <div className="meta">
        <h3 className="name" title={product.title}>{product.title}</h3>
        <p className="short">{product.description}</p>
      </div>
    </article>
  )
}