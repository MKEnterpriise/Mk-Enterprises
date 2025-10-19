import axios from "axios";

export const appUrl = import.meta.env.VITE_APP_URL;

export const getAllProducts = async () => {
  try {
    const { status, data } = await axios.get(
      `${appUrl}/api/products/allProducts`
    );

    if (status === 200) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProductdetail = async (id) => {
  try {
    const { status, data } = await axios.get(`${appUrl}/api/products/${id}`);

    if (status === 200) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addToWishlist = async (userId, productId) => {
  try {
    const {status, data} = await axios.post(`${appUrl}/api/products/addToWishlist`, {
      userId, productId
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    if(status === 200) {
      return data.data
    }
  } catch (error) {
    console.log(error);
  }
}

export const removeFromWishlist = async (userId, productId) => {
  try {
    const {status, data} = await axios.post(`${appUrl}/api/products/removeWishlist`, {
      userId, productId
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    if(status === 200) {
      return data.data
    }
  } catch (error) {
    console.log(error);
  }
}

export const handleGetWishlist = async (userId) => {
    try {
      const { status, data } = await axios.get(`${appUrl}/api/products/getWishlist/${userId}`);

      if (status === 200) {
        return data.data
      }
    } catch (error) {
      console.log(error);
    }
}