import {
  ClosedCaption,
  CroissantIcon,
  CrossIcon,
  LoaderCircle,
  Upload,
  X,
} from "lucide-react";
import React, { useState } from "react";

const ProductForm = ({
  submit,
  inputs,
  handleInputs,
  handleFiles,
  images,
  toBe,
  managePreviewImages,
  loading,
}) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!inputs.category.trim()) {
      newErrors.category = "Category is required.";
    }

    if (!inputs.title.trim()) {
      newErrors.title = "Product name is required.";
    }

    if (!inputs.description.trim()) {
      newErrors.description = "Product description is required.";
    } else if (inputs.description.length < 10) {
      newErrors.description = "Description should be at least 10 characters.";
    }

    if (!String(inputs.price).trim()) {
      newErrors.price = "Price is required.";
    } else if (isNaN(inputs.price) || parseFloat(inputs.price) <= 0) {
      newErrors.price = "Price must be a valid number greater than 0.";
    }

    if (images.length === 0) {
      newErrors.images = "At least one image is required.";
    } else if (images.length > 4) {
      newErrors.images = "You can upload a maximum of 4 images.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      submit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <label>
        Category
        <input
          value={inputs.category}
          name="category"
          onChange={handleInputs}
          required
        />
        {errors.category && <span className="error">{errors.category}</span>}
      </label>
      <label>
        Name
        <input
          value={inputs.title}
          name="title"
          onChange={handleInputs}
          required
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </label>
      <label>
        Short detail
        <input
          value={inputs.description}
          name="description"
          onChange={handleInputs}
          required
        />
        {errors.description && (
          <span className="error">{errors.description}</span>
        )}
      </label>
      <label>
        Price
        <input
          value={inputs.price}
          name="price"
          onChange={handleInputs}
          required
        />
        {errors.price && <span className="error">{errors.price}</span>}
      </label>
      <label className="upload-img">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="upload-img-overlay">
          <Upload height={40} width={40} />
          <span>Upload Images</span>
        </div>
      </label>

      <div className="preview">
        {images.map((img, i) => {
          const src = typeof img === "string" ? img : URL.createObjectURL(img);
          return (
            <div
              className="previewImage"
              onClick={() =>
                managePreviewImages(typeof img === "string" ? src : img)
              }
              key={i}
            >
              <img key={i} src={src} alt={`preview-${i}`} />
              <X />
            </div>
          );
        })}
      </div>

      {errors.images && <span className="error">{errors.images}</span>}

      <div className="form-actions">
        <button
          className="btn"
          type="submit"
          disabled={loading || Object.keys(errors).length > 0}
        >
          {loading ? (
            <LoaderCircle className="spin-animation" height={20} width={20} />
          ) : (
            `${toBe} Product`
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
