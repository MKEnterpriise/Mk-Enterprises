
import React, { useContext, useEffect, useState } from "react";
import { addToWishlist, removeFromWishlist } from "../api/products/products";
import { MyContext } from "../context/ContextProvider";

const HandleWishListHook =  (userId, productId) => {
    const [wishlistLoading, setWishlistLoading] = useState(false);

    const {getWishlist, wishList} = useContext(MyContext);
    const inWishList = wishList?.some(item => item.id === productId);

  const handleWishlist = async () => {
    try {
      setWishlistLoading(true)
      if(inWishList) {
        await removeFromWishlist(userId, productId);
      } else {
        await addToWishlist(userId, productId);
      }
      getWishlist();
    } catch (error) {
      console.log(error);
    } finally {
      setWishlistLoading(false)
    }
  }
  
  useEffect(() => {
    if(userId) {
        getWishlist();
    }
  }, [userId]);

  return {wishlistLoading, inWishList, handleWishlist}
};

export default HandleWishListHook;