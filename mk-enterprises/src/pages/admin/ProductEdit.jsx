import React, { useEffect, useState } from "react";
import ProductForm from "../../components/ProductForm";
import axios from "axios";
import { appUrl, getProductdetail } from "../../api/products/products";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/Header";

const ProductEdit = () => {
  const [images, setImages] = useState([]);
  const [inputs, setInputs] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  function handleFiles(files) {
    const arr = Array.from(files);
    setImages((prev) => prev.concat(arr));
  }

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductdetail = async () => {
    try {
      const prod = await getProductdetail(id);
      setInputs({
        title: prod.title,
        description: prod.description,
        price: prod.price,
        category: prod.category,
      });
      setImages(prod.photos);
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("price", inputs.price);
      formData.append("description", inputs.description);
      formData.append("category", inputs.category);

      // Add existing image URLs
      images.forEach((img) => {
        if (typeof img === "string") {
          formData.append("existingPhotos", img);
        } else {
          formData.append("photos", img); // New files
        }
      });
      const { status } = await axios.put(`${appUrl}/api/products/update/${id}`, formData, {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
      });

      if (status === 200) {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      toast.warn("Failed to update product");
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  const managePreviewImages = (item) => {
    const newImages = images.filter(img => {
    if (typeof img === "string") {
      return img !== item;
    } else {
        console.log(img.name);
      return img.name !== item.name;
    }
  });
    setImages(newImages);
  }

  useEffect(() => {
    handleProductdetail();
  }, []);

  return (
    <div>
      <Header showLogin={true} />
      <ProductForm
        toBe={"Update"}
        submit={submit}
        inputs={inputs}
        handleInputs={handleInputs}
        handleFiles={handleFiles}
        images={images}
        managePreviewImages={managePreviewImages}
        loading={loading}
      />
    </div>
  );
};

export default ProductEdit;
