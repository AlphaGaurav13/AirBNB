import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { authDataContext } from '../Context/AuthContext'
import Nav from '../Component/Nav.jsx'
import axios from 'axios'
import { FaArrowLeftLong, FaStar } from "react-icons/fa6"

function ViewCard() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { serverUrl } = useContext(authDataContext)
    
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [bookingLoading, setBookingLoading] = useState(false)
    const [bookingSuccess, setBookingSuccess] = useState("")
    const [bookingDetails, setBookingDetails] = useState(null)
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState("")
    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")

    // Form state
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [rent, setRent] = useState("")
    const [city, setCity] = useState("")
    const [landmark, setLandmark] = useState("")
    const [category, setCategory] = useState("")
    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [image3, setImage3] = useState(null)
    const [previewImage1, setPreviewImage1] = useState("")
    const [previewImage2, setPreviewImage2] = useState("")
    const [previewImage3, setPreviewImage3] = useState("")

    // Fetch listing data
    const fetchListing = useCallback(async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/listing/${id}`)
            setListing(result.data)
            setTitle(result.data.title)
            setDescription(result.data.description)
            setRent(result.data.rent)
            setCity(result.data.city)
            setLandmark(result.data.landmark)
            setCategory(result.data.category)
            setPreviewImage1(result.data.image1)
            setPreviewImage2(result.data.image2)
            setPreviewImage3(result.data.image3)
        } catch (error) {
            console.error("Error fetching listing:", error)
        } finally {
            setLoading(false)
        }
    }, [serverUrl, id])

    useEffect(() => {
        fetchListing()
    }, [fetchListing])

    // Handle image selection with preview
    const handleImageChange = (e, imageNum) => {
        const file = e.target.files[0]
        if (!file) return
        
        const reader = new FileReader()
        reader.onload = (e) => {
            if (imageNum === 1) {
                setImage1(file)
                setPreviewImage1(e.target.result)
            } else if (imageNum === 2) {
                setImage2(file)
                setPreviewImage2(e.target.result)
            } else if (imageNum === 3) {
                setImage3(file)
                setPreviewImage3(e.target.result)
            }
        }
        reader.readAsDataURL(file)
    }

    const handleBooking = async (e) => {
        e.preventDefault()
        setBookingLoading(true)
        setBookingSuccess("")

        if (!checkIn || !checkOut) {
            alert("Please select check-in and check-out dates")
            setBookingLoading(false)
            return
        }

        try {
            const res = await axios.post(`${serverUrl}/api/booking/${listing._id}`, { checkIn, checkOut }, { withCredentials: true })
            setBookingSuccess(`Booking confirmed! Total: $${res.data.totalPrice}`)
            setBookingDetails({
                id: res.data.booking._id,
                ownerEmail: listing.host?.email || listing.host?.id || "Unknown",
                totalPrice: res.data.totalPrice,
            })
            setListing(prev => ({ ...prev, isBooked: true }))
            alert("Booking successful")
        } catch (err) {
            console.error("Booking error", err)
            const msg = err?.response?.data?.message || "Booking failed"
            alert(msg)
        } finally {
            setBookingLoading(false)
        }
    }

    // Handle update
    const handleUpdate = async (e) => {
        e.preventDefault()
        setUpdating(true)
        
        try {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("description", description)
            formData.append("rent", rent)
            formData.append("city", city)
            formData.append("landmark", landmark)
            formData.append("category", category)
            
            if (image1) formData.append("image1", image1)
            if (image2) formData.append("image2", image2)
            if (image3) formData.append("image3", image3)
            
            const result = await axios.put(`${serverUrl}/api/listing/${id}`, formData, {
                withCredentials: true
            })
            
            setListing(result.data)
            setIsEditing(false)
            setUpdating(false)
            alert("Listing updated successfully!")
        } catch (error) {
            console.error("Error updating listing:", error)
            setUpdating(false)
            alert("Failed to update listing")
        }
    }

    if (loading) {
        return (
            <div>
                <Nav />
                <div className="w-full h-[77vh] flex items-center justify-center">
                    <p>Loading listing...</p>
                </div>
            </div>
        )
    }

    if (!listing) {
        return (
            <div>
                <Nav />
                <div className="w-full h-[77vh] flex items-center justify-center">
                    <p>Listing not found</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Nav />
            <div className="w-full h-auto min-h-[100vh] bg-white flex items-center justify-center relative p-4">
                <div 
                    className="w-[50px] h-[50px] bg-red-500 cursor-pointer absolute top-[5%] left-[20px] rounded-full flex items-center justify-center hover:bg-red-600 transition" 
                    onClick={() => navigate("/mylisting")}
                >
                    <FaArrowLeftLong className="w-[25px] h-[25px] text-white" />
                </div>

                <div className="w-full max-w-[900px]">
                    {!isEditing ? (
                        // View Mode
                        <div className="flex flex-col gap-6">
                            <h1 className="text-3xl font-bold text-gray-800 text-center">{listing.title}</h1>
                            
                            <div className="flex gap-4 flex-wrap justify-center">
                                <img src={listing.image1} alt="Image 1" className="w-[250px] h-[250px] object-cover rounded-lg shadow-md" />
                                <img src={listing.image2} alt="Image 2" className="w-[250px] h-[250px] object-cover rounded-lg shadow-md" />
                                <img src={listing.image3} alt="Image 3" className="w-[250px] h-[250px] object-cover rounded-lg shadow-md" />
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-600">City</p>
                                        <p className="text-lg text-gray-800">{listing.city}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-600">Landmark</p>
                                        <p className="text-lg text-gray-800">{listing.landmark}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-600">Category</p>
                                        <p className="text-lg text-gray-800 capitalize">{listing.category}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-600">Rent</p>
                                        <p className="text-lg text-red-600 font-bold">${listing.rent}/month</p>
                                    </div>
                                </div>
                                
                                <div className="mt-6">
                                    <p className="text-sm font-semibold text-gray-600 mb-2">Description</p>
                                    <p className="text-gray-800 leading-relaxed">{listing.description}</p>
                                </div>
                            </div>

                            {!listing.isBooked ? (
                            <form onSubmit={handleBooking} className="bg-white p-6 rounded-lg border border-gray-200">
                                <h2 className="text-xl font-semibold mb-4">Book this place</h2>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Check-in</label>
                                        <input 
                                            type="date" 
                                            value={checkIn} 
                                            onChange={(e) => setCheckIn(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Check-out</label>
                                        <input 
                                            type="date" 
                                            value={checkOut} 
                                            onChange={(e) => setCheckOut(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                            required
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={bookingLoading}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    {bookingLoading ? "Booking..." : "Book Now"}
                                </button>
                                {bookingSuccess && <p className="mt-3 text-green-600 font-semibold">{bookingSuccess}</p>}
                            </form>
                            ) : (
                                <div className="bg-green-100 border border-green-300 p-4 rounded-lg font-semibold">
                                    This place is already booked.
                                </div>
                            )}

                            <button 
                                onClick={() => setIsEditing(true)}
                                className="px-8 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition text-center"
                            >
                                Edit Listing
                            </button>

                            {bookingDetails && (
                                <div className="mt-6 p-5 rounded-xl border border-gray-200 bg-white shadow-md w-full max-w-md mx-auto">
                                    <h2 className="text-2xl font-bold text-green-600 mb-3">Booking Confirmed</h2>
                                    <div className="text-sm text-gray-700 space-y-1">
                                        <p><span className="font-semibold">Booking Id:</span> {bookingDetails.id}</p>
                                        <p><span className="font-semibold">Owner Details:</span> {bookingDetails.ownerEmail}</p>
                                        <p><span className="font-semibold">Total Rent:</span> ${bookingDetails.totalPrice}</p>
                                    </div>

                                    <div className="mt-4 p-3 bg-white border rounded-lg">
                                        <p className="font-semibold mb-2">Rate this experience</p>
                                        <div className="flex gap-1 mb-2">
                                            {[1,2,3,4,5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setRating(star)}
                                                    className={`text-3xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                >
                                                    <FaStar />
                                                </button>
                                            ))}
                                        </div>
                                        <textarea
                                            value={review}
                                            onChange={(e) => setReview(e.target.value)}
                                            placeholder="Write a short review (optional)"
                                            className="w-full h-[70px] p-2 border border-gray-300 rounded focus:outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                alert(`Thanks! rating: ${rating}/5 ${review ? `- ${review}` : ''}`)
                                                setRating(0)
                                                setReview("")
                                            }}
                                            className="mt-3 w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Edit Mode
                        <form onSubmit={handleUpdate} className="flex flex-col gap-6">
                            <h1 className="text-3xl font-bold text-gray-800 text-center">Edit Listing</h1>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                                <input 
                                    type="text" 
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                <textarea 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                                />
                            </div>

                            {/* Rent */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Rent ($)</label>
                                <input 
                                    type="number" 
                                    value={rent} 
                                    onChange={(e) => setRent(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                                />
                            </div>

                            {/* City & Landmark */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                                    <input 
                                        type="text" 
                                        value={city} 
                                        onChange={(e) => setCity(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Landmark</label>
                                    <input 
                                        type="text" 
                                        value={landmark} 
                                        onChange={(e) => setLandmark(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                                    />
                                </div>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                                <select 
                                    value={category} 
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                                >
                                    <option value="">Select Category</option>
                                    <option value="villa">Villa</option>
                                    <option value="farmHouse">Farm House</option>
                                    <option value="poolHouse">Pool House</option>
                                    <option value="rooms">Rooms</option>
                                    <option value="flat">Flat</option>
                                    <option value="pg">PG</option>
                                    <option value="cabins">Cabins</option>
                                    <option value="shop">Shop</option>
                                </select>
                            </div>

                            {/* Images */}
                            <div className="grid grid-cols-3 gap-4">
                                {[1, 2, 3].map((num) => (
                                    <div key={num}>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Image {num}</label>
                                        <div className="mb-2">
                                            <img 
                                                src={num === 1 ? previewImage1 : num === 2 ? previewImage2 : previewImage3} 
                                                alt={`Preview ${num}`}
                                                className="w-full h-[150px] object-cover rounded-lg border border-gray-300"
                                            />
                                        </div>
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, num)}
                                            className="w-full text-sm text-gray-600"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 justify-center">
                                <button 
                                    type="submit"
                                    disabled={updating}
                                    className="px-8 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition disabled:opacity-50"
                                >
                                    {updating ? "Updating..." : "Save Changes"}
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-8 py-3 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ViewCard
