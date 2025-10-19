import dummyProducts from '../data/dummyProducts'

const KEY = 'ecom_products_v1'
const WKEY = 'ecom_wishlist_v1'

export function loadProducts() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) {
      // seed with dummy data if empty
      localStorage.setItem(KEY, JSON.stringify(dummyProducts))
      return dummyProducts
    }
    return JSON.parse(raw)
  } catch (e) {
    console.error(e)
    return dummyProducts
  }
}

export function saveProducts(products) {
  localStorage.setItem(KEY, JSON.stringify(products))
}

export function loadWishlist() {
  try {
    const raw = localStorage.getItem(WKEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.error(e)
    return []
  }
}

export function saveWishlist(list) {
  localStorage.setItem(WKEY, JSON.stringify(list))
}

export function generateId() {
  return Math.random().toString(36).slice(2, 9)
}