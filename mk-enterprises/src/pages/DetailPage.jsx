import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getProductdetail } from "../api/products/products";
import { Facebook, Heart, LoaderCircle, MessageCircle, Share2, Twitter } from "lucide-react";
import { MyContext } from "../context/ContextProvider";
import HandleWishListHook from "../hooks/HandleWishlist";
import {toast} from 'react-toastify'
export default function DetailPage() {
  
  const [currImgIndex, setCurrImgIndex] = useState(0);
  const [productLoading, setProductLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [inquiry, setInquiry] = useState(null);

  const { id } = useParams();
  const { userData } = useContext(MyContext);

  const {wishlistLoading, inWishList, handleWishlist} = HandleWishListHook(userData?.id, Number(id))
  
  const handleProductdetail = async () => {
    try {
      const prod = await getProductdetail(id);
      setProduct(prod);

    } catch (error) {
      console.log(error);
    } finally {
      setProductLoading(false);
    }
  }

  const handleSendInquiry = (e) => {
    e.preventDefault();

    if(!product || !mobile || !inquiry || !userData) {
      toast.error("Please fill all the fields in the inquiry form before sharing.");
      return;
    }

    const message = encodeURIComponent(`
    Hi there! 

    I'm interested in the *${product?.title}* priced at *Rs. ${product?.price}*.
    
    Here are my details:
    - *Name*: ${userData?.name}
    - *Mobile*: ${mobile}
    - *Inquiry*: ${inquiry}. Could you provide more details?
    
    Looking forward to hearing from you!
    `);

    const phoneNumber = `${import.meta.env.VITE_PHONE_NUMBER}`; 

    const url = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(url, '_blank');
  };

  const handleShareToWhatsApp = () => {
    const {title, price, description, id} = product;

    const productDetails = `
      Check out this product:
      *Name*: ${title}
      *Price*: ₹${price}
      *Description*: ${description}
      *Link*: ${window.location.origin}/product/${id}
    `;
  
    const encodedMessage = encodeURIComponent(productDetails);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  const handleShareToFacebook = () => {
    const url = encodeURIComponent(`${window.location.origin}/product/${product.id}`);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(facebookUrl, "_blank");
  };

  const handleShareToTwitter = () => {
    const text = encodeURIComponent(`Check out this product: ${product?.title} - ₹${product?.price}`);
    const url = encodeURIComponent(`${window.location.origin}/product/${product.id}`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(twitterUrl, "_blank");
  };

  useEffect(() => {
    handleProductdetail();
  }, []);

  return (
    <div className="page detail-page">
      <Header showLogin={true} />
      {
        productLoading ?
          <main className="container main fade-in">
            <div className="detail-grid">

              <div className="images_container">
                <div className="main_img">
                  <div className="main-img-shimmer shimmer"></div>
                </div>
                <div className="gallery">
                  {
                    Array.from({length: 4}).map(currElem => <div className="gallery-shimmer shimmer" key={currElem}></div>)
                  }
                </div>
              </div>
              <div className="detail-meta">
                {
                  Array.from({length: 3}).map(currElem => <div className="detail-shimmer shimmer" key={currElem}></div>)
                }
              </div>
            </div>
          </main> :
          <main className="container main fade-in">
            <div className="detail-grid">

              <div className="images_container">
                <div className="main_img">
                  <img src={product.photos[currImgIndex]} alt="" />
                </div>
                <div className="gallery">
                  {product.photos?.map((src, i) => (
                    <img key={i} src={src} alt={`${product.title}-${i}`} onClick={() => setCurrImgIndex(i)} />
                  ))}
                </div>
              </div>
              <div className="detail-meta">
                <h1 className="product-title">{product.title}</h1>
                <p className="product-detail">{product.description}</p>
                <div className="price large">₹{product.price}</div>

                <div className="detail-controls">
                 
                  <button onClick={handleShareToWhatsApp}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="currentColor">
                      <path d="M12.04 2C6.52 2 2 6.48 2 12c0 1.88.49 3.67 1.42 5.28L2 22l4.85-1.36C8.46 21.5 10.2 22 12.04 22c5.52 0 10.04-4.48 10.04-10s-4.52-10-10.04-10zm-.01 18c-1.6 0-3.16-.43-4.52-1.25l-.33-.19-2.88.81.8-2.81-.21-.34C4.98 14.7 4.5 13.38 4.5 12c0-4.14 3.39-7.5 7.55-7.5 2.01 0 3.9.78 5.32 2.2 1.42 1.41 2.2 3.3 2.2 5.3 0 4.14-3.39 7.5-7.55 7.5zm4.35-5.6c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.53.12-.16.24-.61.78-.75.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.01-.38.1-.5.1-.1.24-.26.36-.39.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.28-.73-1.75-.19-.46-.39-.4-.53-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.68 4.14 3.62.58.24 1.03.38 1.38.49.58.18 1.1.16 1.52.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"/>
                    </svg>
                  </button>

                  <button onClick={handleShareToFacebook}>
                    <Facebook />
                  </button>

                  <button onClick={handleShareToTwitter}>
                    <Twitter />
                  </button>
                  <button onClick={handleWishlist}>
                    {
                      wishlistLoading ? 
                      <LoaderCircle className="spin-animation" height={20} width={20} /> : 
                      <Heart color={inWishList ? 'red' : "white"}/>
                    }
                  </button>
                </div>
              </div>
            </div>
          </main>
      }
      <form className="form">
        <h2><MessageCircle /> Product Inquiry</h2>
        <div className="inputs">
          <div className="input">
            <label htmlFor="name">Your Name</label>
            <input type="text" name="" id="name" placeholder="Enter your name" value={userData?.name}/>
          </div>
          <div className="input">
            <label htmlFor="mobile">Mobile Number</label>
            <input type="text" name="" id="mobile" placeholder="Enter mobile number" value={mobile} onChange={(e) => setMobile(e.target.value)}/>
          </div>
        </div>

        <div className="inputs">
          <div className="input">
            <label htmlFor="productName">Product Name</label>
            <input type="text" name="" id="productName" placeholder="Enter your name" value={product?.title}/>
          </div>
          <div className="input">
            <label htmlFor="price">Product Price</label>
            <input type="text" name="" id="price" placeholder="Enter mobile number" value={product?.price}/>
          </div>
        </div>
        <div className="inputs">
          <div className="input">
            <label htmlFor="inquiry">Your Inquiry</label>
            <textarea name="" id="inquiry" value={inquiry} onChange={(e) => setInquiry(e.target.value)} placeholder="Tell us about your requirements, questions, or any specific details..." rows={10}>

            </textarea>
          </div>
        </div>

        <button type="submit" onClick={handleSendInquiry} disabled={!product || !mobile || !inquiry || !userData}> <MessageCircle /> Send Inquiry via WhatsApp</button>
      </form>
      <Footer />
    </div>
  );
}
