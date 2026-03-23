import React, { useContext, useEffect, useState } from 'react'
import Nav from '../Component/Nav.jsx'
import { authDataContext } from '../Context/AuthContext.jsx'
import axios from 'axios'

function MyBookings() {
  const { serverUrl } = useContext(authDataContext)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/booking/mybookings`, { withCredentials: true })
        setBookings(result.data)
      } catch (error) {
        console.error('Failed to load bookings', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [serverUrl])

  return (
    <div>
      <Nav />
      <div className="w-full min-h-[80vh] p-6 mt-[120px]">
        <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
        {loading && <p>Loading bookings...</p>}
        {!loading && bookings.length === 0 && <p>No bookings yet.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="border p-4 rounded-lg shadow-sm">
              <h2 className="font-semibold text-xl">{booking.listing?.title || 'Untitled'}</h2>
              <p className="text-sm">City: {booking.listing?.city}</p>
              <p className="text-sm">Landmark: {booking.listing?.landmark}</p>
              <p className="text-sm">Price per month: ${booking.listing?.rent}</p>
              <p className="text-sm">Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
              <p className="text-sm">Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
              <p className="text-sm">Total: ${booking.totalPrice}</p>
              <p className="text-sm">Status: {booking.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyBookings
