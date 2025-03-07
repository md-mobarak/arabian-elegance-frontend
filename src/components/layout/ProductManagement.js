"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { MdVisibility, MdEdit, MdDelete, MdAdd } from "react-icons/md";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ProductModal from "../ProductModal";

const fetchProducts = async () => {
  const { data } = await axios.get("http://localhost:5000/api/v1/product");
  return data.products;
};

export default function ProductManagement() {
  const queryClient = useQueryClient();
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("view");

  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm();

  const isAdmin = true; // Replace this with actual admin check logic

  const addProductMutation = useMutation({
    mutationFn: async (newProduct) =>
      axios.post("http://localhost:5000/api/v1/product", newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product added successfully!");
    },
    onError: () => {
      if (!isAdmin) {
        toast.error("You do not have permission to add products.");
      }
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async (updatedProduct) =>
      axios.put(
        `http://localhost:5000/api/v1/product/${selectedProduct._id}`,
        updatedProduct
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product updated successfully!");
    },
    onError: () => {
      if (!isAdmin) {
        toast.error("You do not have permission to update products.");
      }
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id) =>
      axios.delete(`http://localhost:5000/api/v1/product/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product deleted successfully!");
    },
    onError: () => {
      if (!isAdmin) {
        toast.error("You do not have permission to delete products.");
      }
    },
  });

  const handleOpenModal = (type, product = null) => {
    if (!isAdmin && type !== "view") {
      toast.error("You do not have permission to perform this action.");
      return;
    }
    setSelectedProduct(product);
    setModalType(type);
    setIsModalOpen(true);
    reset(product || {});
  };

  const handleDelete = (id) => {
    if (!isAdmin) {
      toast.error("You do not have permission to delete products.");
      return;
    }
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this product?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteProductMutation.mutate(id),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const onSubmit = (data) => {
    if (!isAdmin) {
      toast.error("You do not have permission to perform this action.");
      return;
    }
    if (data.images) {
      data.images = data.images.split(",").map((url) => url.trim());
    }
    if (modalType === "edit") {
      updateProductMutation.mutate(data);
    } else {
      addProductMutation.mutate(data);
    }
    setIsModalOpen(false);
  };

  const sizes = ["S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "38"];
  const colors = ["Red", "Blue", "Green", "Black", "White"];
  const tags = ["Panjabi", "Tencel", "Casual", "Formal"];

  const handleTagClick = (field, value) => {
    const currentValues = watch(field) || [];
    if (currentValues.includes(value)) {
      setValue(field, currentValues.filter((item) => item !== value));
    } else {
      setValue(field, [...currentValues, value]);
    }
  };

  return (
    <div className="p-4">
      <button
        className="mb-4 btn btn-primary bg-green-500 p-2 rounded-lg text-white flex items-center gap-2"
        onClick={() => handleOpenModal("add")}
      >
        <MdAdd size={20} />
        Add Product
      </button>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              // Skeleton Loading for Table Rows
              Array(5).fill(0).map((_, index) => (
                <tr key={index} className="hover:bg-base-300">
                  <td>
                    <Skeleton height={64} width={64} />
                  </td>
                  <td>
                    <Skeleton width={150} />
                  </td>
                  <td>
                    <Skeleton width={100} />
                  </td>
                  <td>
                    <Skeleton width={80} />
                  </td>
                  <td>
                    <Skeleton width={80} />
                  </td>
                  <td className="flex justify-center gap-3">
                    <Skeleton width={24} height={24} />
                    <Skeleton width={24} height={24} />
                    <Skeleton width={24} height={24} />
                  </td>
                </tr>
              ))
            ) : (
              // Actual Table Data
              products?.map((product) => (
                <tr key={product._id} className="hover:bg-base-300">
                  <td>
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td>{product.title}</td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td>{product.stock}</td>
                  <td className="flex justify-center gap-3">
                    <button
                      onClick={() => handleOpenModal("view", product)}
                      className="text-blue-500 hover:text-blue-700"
                      title="View Details"
                    >
                      <MdVisibility size={24} />
                    </button>
                    <button
                      onClick={() => handleOpenModal("edit", product)}
                      className="text-green-500 hover:text-green-700"
                      title="Edit Product"
                    >
                      <MdEdit size={24} />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete Product"
                    >
                      <MdDelete size={24} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalType === "view" ? (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-3">{selectedProduct?.title}</h2>
            <p className="mb-2">{selectedProduct?.description}</p>
            <p className="mb-1">
              Price: <span className="font-semibold">${selectedProduct?.price}</span>
            </p>
            <p>
              Stock: <span className="font-semibold">{selectedProduct?.stock}</span>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                placeholder="Title"
                className="input input-bordered w-full"
              />
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>
            <div>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                {...register("description", { required: "Description is required" })}
                placeholder="Description"
                className="textarea textarea-bordered w-full"
              />
              {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>
            <div>
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price", { required: "Price is required", valueAsNumber: true })}
                placeholder="Price"
                className="input input-bordered w-full"
              />
              {errors.price && <p className="text-red-500">{errors.price.message}</p>}
            </div>
            <div>
              <label className="label">
                <span className="label-text">Stock</span>
              </label>
              <input
                type="number"
                {...register("stock", { required: "Stock is required", valueAsNumber: true })}
                placeholder="Stock"
                className="input input-bordered w-full"
              />
              {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
            </div>
            <div>
              <label className="label">
                <span className="label-text">Brand</span>
              </label>
              <input
                type="text"
                {...register("brand")}
                placeholder="Brand"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Sizes</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleTagClick("sizes", size)}
                    className={`btn btn-sm ${
                      watch("sizes")?.includes(size) ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <input
                type="text"
                {...register("sizes")}
                className="input input-bordered w-full mt-2"
                readOnly
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Colors</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleTagClick("colors", color)}
                    className={`btn btn-sm ${
                      watch("colors")?.includes(color) ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
              <input
                type="text"
                {...register("colors")}
                className="input input-bordered w-full mt-2"
                readOnly
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Tags</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick("tags", tag)}
                    className={`btn btn-sm ${
                      watch("tags")?.includes(tag) ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <input
                type="text"
                {...register("tags")}
                className="input input-bordered w-full mt-2"
                readOnly
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Images</span>
              </label>
              <input
                type="text"
                {...register("images", { required: "At least one image URL is required" })}
                placeholder="Image URL(s) (comma separated)"
                className="input input-bordered w-full"
              />
              {errors.images && <p className="text-red-500">{errors.images.message}</p>}
              <small className="text-gray-500">
                Enter one or more image URLs, separated by commas.
              </small>
            </div>
            <button type="submit" className="btn btn-success bg-black p-2 text-white w-full">
              {modalType === "edit" ? "Update Product" : "Add Product"}
            </button>
          </form>
        )}
      </ProductModal>
    </div>
  );
}