import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import { useContext } from "react";
import { MyContext } from "../../context/ContextProvider";
import { appUrl } from "../../api/products/products";
import ProductForm from "../../components/ProductForm";
import { Edit, Eye, LoaderCircle, Trash, Trash2, View, ViewIcon } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminDashboard() {

  const [images, setImages] = useState([]);
  const [inputs, setInputs] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
  });

  const [loading, setLoading] = useState({
    add: false,
    delete: false
  })

  const { products, fetchProducts, productLoading } = useContext(MyContext);
  const navigate = useNavigate();

  function handleFiles(files) {
    
    const arr = Array.from(files);
    const total = images.length + arr.length;

    if (total > 4) {
      toast.warn("You can upload a maximum of 4 images.");
      return;
    }

    setImages((prev) => prev.concat(arr));
  }

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();

    setLoading(prev => ({
      ...prev,
      add: true
    }))

    try {
      const formData = new FormData();
      formData.append("category", inputs.category);
      formData.append("title", inputs.title);
      formData.append("description", inputs.description);
      formData.append("price", inputs.price);
      images.forEach((image) => {
        formData.append("photos", image);
      });

      const { status } = await axios.post(
        `${appUrl}/api/products/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (status === 201) {
        toast.success("Product added successfully");
        fetchProducts();
        setImages([]);
        setInputs({
          category: "",
          title: "",
          description: "",
          price: "",
        });
      }
    } catch (error) {
      toast.warn("Failed to add product");
      console.log(error);
    } finally {
      setLoading(prev => ({
        ...prev,
        add: false
      }))
    }
  };

  const handleRemoveProduct = async (id) => {

    setLoading(prev => ({
      ...prev,
      delete: {...prev.delete, [id]: true}
    }))

    try {
      const { status } = await axios.delete(
        `${appUrl}/api/products/delete/${id}`
      );
      if (status === 200) {
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(prev => ({
        ...prev,
        delete: {...prev.delete, [id]: false}
      }))
    }
  };

  const managePreviewImages = (item) => {
    const newImages = images.filter((img) => {
      if (typeof img === "string") {
        console.log("string");
        return img !== item;
      } else {
        return img.name !== item.name;
      }
    });
    setImages(newImages);
  };

  const handleNavigate = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  return (
    <div className="page admin-page">
      <Header showLogin={true} />
      <main className="container main fade-in">
        <section className="admin-grid">
          <div className="admin-form scale-up">
            <h2>Add Product</h2>
            <ProductForm
              managePreviewImages={managePreviewImages}
              toBe={"Add"}
              submit={submit}
              inputs={inputs}
              handleInputs={handleInputs}
              handleFiles={handleFiles}
              images={images}
              loading={loading.add}
            />
          </div>

          <div className="admin-list">
            <h2>Products</h2>
            {products.length === 0 && <p>No products yet</p>}
            <div className="products-grid">
              {productLoading ? (
                <>
                {
                  Array.from({length: 3}).map(currElem => (
                    <div className="admin-prod-card-container" key={currElem}>
                      <div className="shimmer admin-prod-card"></div>
                      <div className="shimmer admin-prod-card"></div>
                    </div>
                  ))
                }
                </>
              ) : (
                products.map((currElem) => (
                  <div key={currElem.id} className="admin-card fade-in-up">
                    <img src={currElem.photos?.[0] || ""} alt={currElem.name} />

                    <div className="info">
                      <strong>{currElem.title}</strong>
                      <p className="description">{currElem.description}</p>
                      <div className="price">₹{currElem.price}</div>

                      <div className="product-actions">
                        <button className="btn small">
                          <Link to={`/product/${currElem.id}`}>
                            <Eye height={20} width={20} />
                          </Link>
                        </button>

                        <button className="btn small edit" onClick={() => handleNavigate(currElem.id)}>
                          <Edit height={20} width={20} />
                        </button>

                        <button className="btn small danger" onClick={() => handleRemoveProduct(currElem.id)}>
                          {
                            loading.delete[currElem.id] ? 
                            <LoaderCircle className="spin-animation" height={20} width={20} /> : 
                            <Trash2 height={20} width={20} />
                          }
                        </button>
                        
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
