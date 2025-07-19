import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Contexts/Contexts';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import refundImage from '../../Assets/Payment/Refund.jpeg';
import BACKEND_API_ENDPOINT from '../../config';

const PurchasedProducts = () => {
    const [purchasedProducts, setPurchasedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext); // Get user from AuthContext
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {

        if (!token) {
            toast.error('You need to be logged in first.', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,

                draggable: true,
                progress: undefined,
                pauseOnHover: false,
            });

            setTimeout(() => {
                navigate('/login'); // Redirect to login after 3 seconds
            }, 3000);
            return; // Exit if no token
        }


        const fetchPurchasedProducts = async () => {

            const url = user && user.userName === 'admin'
                ? `${BACKEND_API_ENDPOINT}/sellRecyclingProducts/getAllPurchasedProducts` // Admin API
                : `${BACKEND_API_ENDPOINT}/sellRecyclingProducts/getPurchasedProducts`; // User API

            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPurchasedProducts(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load purchased products');
                setLoading(false);
            }
        };

        fetchPurchasedProducts();
    }, [user, token, navigate]); // Add user to dependencies

    const handleStatusChange = async (orderId, newStatus) => {
        const token = localStorage.getItem('token');

        try {
            await axios.put(
                `${BACKEND_API_ENDPOINT}/sellRecyclingProducts/updateOrderStatus/${orderId}`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setPurchasedProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === orderId
                        ? { ...product, status: newStatus }
                        : product
                )
            );
        } catch (error) {
            setError('Failed to update order status');
            console.error(error);
        }
    };

    const handleCancelOrder = async (orderId) => {
        const token = localStorage.getItem('token');

        try {
            await axios.put(
                `${BACKEND_API_ENDPOINT}/sellRecyclingProducts/cancelOrder/${orderId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Update the purchased products list to reflect the cancelled status
            setPurchasedProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === orderId
                        ? { ...product, status: 'Cancelled' }
                        : product
                )
            );

            toast.success("Order has been cancelled", {
                position: 'top-center',
                autoClose: 3000,
            });

            if (user.userName !== 'admin') {
                setModalMessage("Your order has been cancelled. The refund will be processed within 2-3 working days.");
                setIsModalOpen(true); // Show the modal
            }

        } catch (error) {
            setError('Failed to cancel order');
            console.error(error);
        }
    };

    const openConfirmModal = (orderId) => {
        setSelectedOrderId(orderId);
        setIsConfirmModalOpen(true);
    };

    const confirmCancelOrder = () => {
        setIsConfirmModalOpen(false);
        handleCancelOrder(selectedOrderId);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage("");
    };

    const closeConfirmModal = () => {
        setIsConfirmModalOpen(false);
        setSelectedOrderId(null);
    };




    return (
        <>
            <Header />
            <ToastContainer />
            <div className="p-6 bg-gray-100 min-h-screen">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Purchased Products</h2>
                {purchasedProducts.length === 0 ? (
                    <p className="text-center text-gray-600">No products purchased yet.</p>
                ) : (
                    <div className="flex flex-col space-y-6">
                        {purchasedProducts.map(({ _id, productId, quantity, totalPrice, purchasedAt, status, address }, index) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-300 p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 flex"
                            >
                                <img
                                    src={productId.images[0]?.url}
                                    alt={productId.name}
                                    className="w-2/12 h-40 object-cover rounded-md shadow-md"
                                />
                                <div className="flex flex-col justify-between w-10/12 pl-4">
                                    <div className="flex justify-between items-start">
                                        {/* Product Details */}
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{productId.name}</h3>
                                            <p className="text-gray-600 mb-1">Quantity: {quantity}</p>
                                            <p className="text-gray-600 mb-1">
                                                Total Price: <span className="font-bold text-green-600">₹{totalPrice}</span>
                                            </p>
                                            <p className="text-gray-500 text-sm mb-3">
                                                Purchased on: {new Date(purchasedAt).toLocaleDateString()}
                                            </p>
                                        </div>

                                        {/* Address (displayed only for admin) */}
                                        {user && user.userName === 'admin' && address && (
                                            <div className="text-gray-600 text-sm text-right">
                                                <p className="text-gray-800 font-semibold mb-1">Address:</p>
                                                <p>{address.street}</p>
                                                <p>{address.city}, {address.state} {address.postalCode}</p>
                                                <p>{address.country}</p>
                                            </div>
                                        )}
                                    </div>



                                    <div className={`mt-2 p-2 rounded-md text-center text-white 
                                        ${status === 'Order Delivered' ? 'bg-green-500'
                                            : status === 'Order Shipped' ? 'bg-yellow-500'
                                                : status === 'Cancelled' ? 'bg-red-500'
                                                    : 'bg-blue-500'}`}>
                                        {status}
                                    </div>

                                    <div className="flex items-center space-x-4 my-2">
                                        {status !== "Cancelled" && status !== "Order Delivered" && (
                                            <button onClick={() => openConfirmModal(_id)} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700">
                                                Cancel Order
                                            </button>
                                        )}
                                    </div>

                                    {user && user.userName === 'admin' && (
                                        <select
                                            value={status}
                                            onChange={(e) => handleStatusChange(_id, e.target.value)}
                                            className="mt-2 border border-gray-300 rounded-md p-1"
                                        >
                                            <option value="Order Confirmed">Order Confirmed</option>
                                            <option value="Order Shipped">Order Shipped</option>
                                            <option value="Order Delivered">Order Delivered</option>
                                        </select>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm text-center relative">
                        <img
                            src={refundImage} // Replace with your image URL
                            alt="Confirmation Icon"
                            className="w-34 h-32 mx-auto mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Order Cancelled</h3>
                        <p className="text-gray-600 mb-6">{modalMessage}</p>
                        <button
                            onClick={closeModal}
                            className="bg-gradient-to-r from-green-600 to-green-500 text-white py-2 px-4 rounded-lg hover:from-green-700 hover:to-green-500 shadow-md transition-all duration-200"
                        >
                            Close
                        </button>
                        <div className="absolute top-1 right-3 cursor-pointer" onClick={closeModal}>
                            <span className="text-gray-500 hover:text-gray-700 text-2xl">&times;</span>
                        </div>
                    </div>
                </div>
            )}

            {isConfirmModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center">
                        <p className="text-gray-800 mb-4">Are you sure you want to cancel this order?</p>
                        <div className="flex justify-center space-x-4">
                            <button onClick={confirmCancelOrder} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700">
                                Yes, Cancel
                            </button>
                            <button onClick={closeConfirmModal} className="bg-gray-300 py-2 px-4 rounded-md hover:bg-gray-400">
                                No, Go Back
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default PurchasedProducts;
