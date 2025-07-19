import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBan } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import BACKEND_API_ENDPOINT from '../../config';

const ProductModal = ({ product, onClose }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [flag, setFlag] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedImages, setSelectedImages] = useState({});
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    });
    const [showFullDescription, setShowFullDescription] = useState(false);

    useEffect(() => {
        if (!token) {
            toast.error('You need to be logged in first.', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
            setFlag(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
            return;
        }
    }, [token, navigate]);

    const handleQuantityChange = (e) => setQuantity(e.target.value);

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({ ...prev, [name]: value }));
    };

    const totalPrice = product.price * quantity;

    const confirmPurchase = async () => {
        const data = {
            productId: product._id,
            quantity,
            amount: totalPrice,
            userId: localStorage.getItem("userId"),
            address
        };

        try {
            const response = await axios.post(`${BACKEND_API_ENDPOINT}/payment/create-order`, data);
            console.log(response.data);
            window.location.href = response.data.url;
        } catch (error) {
            console.log("error in payment", error);
        }
    };

    const toggleDescription = () => {
        setShowFullDescription((prev) => !prev);
    };

    return (
        <>
            <ToastContainer />
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white w-11/12 sm:w-2/3 lg:w-1/2 p-6 rounded-lg shadow-lg relative max-h-[98vh] overflow-y-auto">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 text-2xl hover:text-gray-700">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                    <div className="flex space-x-4">
                        <img
                            src={selectedImages[product._id] || product.images[0]?.url}
                            alt={product.name}
                            className="w-3/4 h-64 object-cover rounded-md"
                        />
                        <div className="flex flex-col space-y-2">
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
                    </div>

                    <p className="text-gray-900 font-semibold mb-2 mt-1">Price per unit: ₹{product.price}</p>


                    <div className="text-gray-700 mb-2 ">
                        {showFullDescription ? (
                            <p>{product.description}</p>
                        ) : (
                            <p>{product.description.slice(0, 150)}...</p>
                        )}
                        <button
                            onClick={toggleDescription}
                            className="text-blue-500 "
                        >
                            {showFullDescription ? 'Show Less' : 'Show More'}
                        </button>
                    </div>


                    <div className="flex items-center mb-2">
                        <label htmlFor="quantity" className="mr-4">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            min="1"
                            max={product.quantity > 10 ? 10 : product.quantity}
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="border border-gray-300 rounded-md p-2 w-20"
                        />
                    </div>

                    <p className="text-xl font-bold mb-2">Total Price: ₹{totalPrice}</p>

                    {/* Address Fields */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Shipping Address:</label>

                        {/* Street Address - Full width */}
                        <input
                            type="text"
                            name="street"
                            placeholder="Street Address"
                            value={address.street}
                            onChange={handleAddressChange}
                            className="border border-gray-300 rounded-lg p-3 w-full shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300 ease-in-out mb-2"
                        />

                        {/* City and Postal Code - Same line */}
                        <div className="flex space-x-4 mb-2">
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={address.city}
                                onChange={handleAddressChange}
                                className="border border-gray-300 rounded-lg p-3 w-full shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300 ease-in-out"
                            />
                            <input
                                type="text"
                                name="postalCode"
                                placeholder="Postal Code"
                                value={address.postalCode}
                                onChange={handleAddressChange}
                                className="border border-gray-300 rounded-lg p-3 w-full shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300 ease-in-out"
                            />
                        </div>

                        {/* State and Country - Same line */}
                        <div className="flex space-x-4">
                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={address.state}
                                onChange={handleAddressChange}
                                className="border border-gray-300 rounded-lg p-3 w-full shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300 ease-in-out"
                            />
                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                value={address.country}
                                onChange={handleAddressChange}
                                className="border border-gray-300 rounded-lg p-3 w-full shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300 ease-in-out"
                            />
                        </div>
                    </div>

                    <button
                        onClick={confirmPurchase}
                        className={`py-2 px-4 rounded-md font-semibold w-full ${flag ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                        disabled={flag}
                    >
                        {flag ? (
                            <>
                                Confirm Purchase <FontAwesomeIcon icon={faBan} className="ml-2" />
                            </>
                        ) : (
                            'Confirm Purchase'
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductModal;
