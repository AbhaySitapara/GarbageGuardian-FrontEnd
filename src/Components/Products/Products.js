import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Contexts/Contexts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import ProductForm from './ProductForm';
import ProductModal from './ProductModal';
import BACKEND_API_ENDPOINT from '../../config';

const ProductDisplay = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImages, setSelectedImages] = useState({});
    const [expandedDescriptions, setExpandedDescriptions] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({});
    const { user } = useContext(AuthContext);
    const [deleting, setDeleting] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleBuyNowClick = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    // Fetch products from the API
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${BACKEND_API_ENDPOINT}/sellRecyclingProducts/recycled-products`);
            setProducts(response.data.data);
            setFilteredProducts(response.data.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    // Handle adding a new product
    const handleAddNewProduct = () => {
        setFormData({});
        setShowForm(true);
    };

    // Handle updating an existing product
    const handleUpdateProduct = (productId) => {
        const productToEdit = products.find((product) => product._id === productId);
        setFormData(productToEdit);
        setShowForm(true);
    };

    // Handle deleting a product
    const handleDeleteProduct = async (productId) => {
        const token = localStorage.getItem('token');
        setDeleting(productId);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        try {
            await axios.delete(`${BACKEND_API_ENDPOINT}/sellRecyclingProducts/recycled-products/${productId}`, config);
            fetchProducts();
        } catch (err) {
            console.error("Error deleting product:", err);
        }
        finally {
            setDeleting(null); // Reset the deleting state
        }
    };

    // Handle submitting the form for adding/updating a product
    const handleSubmitForm = async (data) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            if (formData._id) {
                // Update existing product
                await axios.put(`${BACKEND_API_ENDPOINT}/sellRecyclingProducts/recycled-products/${formData._id}`, data, config);
            } else {
                // Create new product
                await axios.post(`${BACKEND_API_ENDPOINT}/sellRecyclingProducts/recycled-products`, data, config);
            }

            setShowForm(false); // Close the form

            fetchProducts(); // Refresh the product list

        } catch (err) {
            console.error("Error saving product:", err);

        }
    };

    // Function to toggle the description expansion
    const toggleDescription = (productId) => {
        setExpandedDescriptions((prev) => ({
            ...prev,
            [productId]: !prev[productId],
        }));
    };

    // Filter products based on the search term
    useEffect(() => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    // Calculate products to display based on the current page
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) return <div className="text-center mt-10 text-xl text-blue-500 animate-pulse">Loading...</div>;
    if (error) return <div className="text-center text-red-500 mt-10 text-xl">Error: {error}</div>;

    return (
        <div className="container mx-auto p-4 sm:p-6 bg-gray-100 min-h-screen">
            {showModal && selectedProduct && (
                <ProductModal product={selectedProduct} onClose={() => setShowModal(false)} />
            )}

            {showForm && (
                <ProductForm
                    initialData={formData}
                    onSubmit={handleSubmitForm}
                    onClose={() => setShowForm(false)}
                />
            )}

            <h1 className="text-3xl font-bold text-center">
                <span className="bg-emerald-950 text-white px-2 py-1 rounded-md">Featured</span>
                <span className="bg-green-400 text-emerald-950 ml-1 px-2 py-1 rounded-md">Products</span>
            </h1>

            <div className="flex justify-between items-center mb-4">
                <div className="relative w-full max-w-md">
                    <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="border border-gray-300 rounded-md px-10 py-2 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {user && user.userName === 'admin' && (
                    <button onClick={handleAddNewProduct} className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition flex items-center">
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Add New Product
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {currentProducts.map((product) => (
                    <div key={product._id} className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 flex flex-col">
                        <div className="relative">
                            <img
                                src={selectedImages[product._id] || product.images[0]?.url}
                                alt={product.name}
                                className="w-full h-60 object-cover"
                            />
                            {product.quantity === 0 && (
                                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex items-center justify-center">
                                    <span className="text-white text-lg font-bold">Out of Stock</span>
                                </div>
                            )}
                        </div>

                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
                            <div className="flex justify-left space-x-2 p-2">
                                {product.images.slice(0, 4).map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.url}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-16 h-16 object-cover rounded-md border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-transform"
                                        onClick={() => setSelectedImages((prevState) => ({
                                            ...prevState,
                                            [product._id]: image.url,
                                        }))}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-600 mt-1">
                                {expandedDescriptions[product._id] ? product.description : `${product.description.slice(0, 100)}...`}
                                <button
                                    onClick={() => toggleDescription(product._id)}
                                    className="text-blue-500 ml-2 underline">
                                    {expandedDescriptions[product._id] ? "Show Less" : "Show More"}
                                </button>
                            </p>
                            {user && user.userName === 'admin' && <p className="text-green-600 font-bold mt-2">₹{product.price}</p>}
                        </div>

                        {user && user.userName === 'admin' ? (
                            <div className="flex space-x-2 p-4 mt-auto">
                                <button
                                    onClick={() => handleUpdateProduct(product._id)}
                                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md">
                                    <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                    Update Product
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(product._id)}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md"
                                    disabled={deleting === product._id}
                                >
                                    {deleting === product._id ? (
                                        <FontAwesomeIcon icon={faTrash} className="mr-2 animate-spin" />
                                    ) : (
                                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                    )}
                                    {deleting === product._id ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        ) : (
                            <div className="p-4 mt-auto">
                                {product.quantity === 0 ? (
                                    <button disabled className="w-full bg-gray-400 text-white font-semibold py-2 rounded-md">
                                        Out of Stock
                                    </button>
                                ) : (
                                    <>
                                        {product.quantity <= 9 && (
                                            <p className="text-yellow-500 font-semibold mb-2">
                                                Hurry up, only {product.quantity} left!
                                            </p>
                                        )}
                                        <button onClick={() => handleBuyNowClick(product)}
                                            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md">
                                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                            Buy Now  (only ₹{product.price})
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg transition-all hover:scale-105 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <span className="text-xl text-gray-800 font-medium flex items-center">
                    {`Page ${currentPage} of ${totalPages}`}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg transition-all hover:scale-105 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>

        </div>
    );
};

export default ProductDisplay;
