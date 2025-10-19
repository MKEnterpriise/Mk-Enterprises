  import { useState } from "react";
  import { appUrl, getAllProducts, handleGetWishlist } from "../api/products/products";
  import { useEffect } from "react";
  import { createContext } from "react";
  import axios from "axios";
  import Cookies from "js-cookie";

  export const MyContext = createContext();

  const ContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [productLoading, setProductLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [userData, setUserData] = useState();
    const [wishList, setWishlist] = useState([]);
    const [wishlistLoading, setWishlistLoading] = useState(true);

    const userCookie = Cookies.get("token");
    
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        if (response) {
          setProducts(response);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setProductLoading(false);
      }
    };

    const getUserDetails = async () => {
      try {
        const { status, data } = await axios.get(
          `${appUrl}/auth/getUserprofile`,
          {
            headers: {
              Authorization: `Bearer ${userCookie}`,
            },
          }
        );

        if (status === 200) {
          setUserData(data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getWishlist = async () => {
      try {
        const res = await handleGetWishlist(userData?.id);
        setWishlist(res);
      } catch (error) {
        console.log(error);
      } finally {
          setWishlistLoading(false)
      }
    };

    useEffect(() => {
      fetchProducts();
    }, [setProducts]);

    useEffect(() => {
      if (userCookie) {
        setIsLoggedIn(true);
        getUserDetails();
      }
    }, [userCookie]);

    return (
      <MyContext.Provider
        value={{
          products,
          setProducts,
          fetchProducts,
          productLoading,
          userData,
          isLoggedIn,
          setIsLoggedIn,
          wishList,
          setWishlist,
          getWishlist,
          wishlistLoading
        }}
      >
        {children}
      </MyContext.Provider>
    );
  };

  export default ContextProvider;
