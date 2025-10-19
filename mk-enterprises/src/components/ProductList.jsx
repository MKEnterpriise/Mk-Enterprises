import React from 'react'
import ProductCard from './ProductCard'

export default function ProductList({ products, onAddToWishlist, productLoading }) {
  return (
    <div className="products-grid">
      {productLoading ? (
        <>
        {
          Array.from({length: 4}).map(currElem => <div className="shimmer card" key={currElem}></div>)
        }
        </>
      ) : (
        products.map(p => (
          <ProductCard key={p.id} product={p} onAddToWishlist={onAddToWishlist} />
        ))
      )}
    </div>
  )
}
