import React, { useState } from 'react';
import './ProductForm.css'; // Make sure to import your CSS file

const ProductForm = ({ initialData = {}, onSubmit, onClose }) => {
    const [name, setName] = useState(initialData.name || "");
    const [description, setDescription] = useState(initialData.description || "");
    const [price, setPrice] = useState(initialData.price || "");
    const [quantity, setQuantity] = useState(initialData.quantity || "");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false); // Add loading state

    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("quantity", quantity);
        images.forEach((image) => formData.append("images", image));

        try {
            await onSubmit(formData);
        } catch (error) {
            console.error("Error uploading data:", error);
        } finally {
            setLoading(false); // Stop loading after the request
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
            <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md transition-transform transform hover:scale-105">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">{initialData._id ? "Update Product" : "Add New Product"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Product Name"
                        className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Product Description"
                        className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        className="w-full p-4 border border-gray-300 rounded-lg mb-4 text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition"
                    />
                    <div className="flex justify-end">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition duration-200"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="spinner mr-2"></div>
                                    Uploading...
                                </>
                            ) : (
                                initialData._id ? "Update" : "Add"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
