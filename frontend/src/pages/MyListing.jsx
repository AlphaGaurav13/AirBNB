import React, { useContext, useEffect, useState, useCallback } from 'react'
import Nav from '../Component/Nav.jsx'
import Card from '../Component/Card.jsx'
import { userDataContext } from '../Context/UserContext.jsx'
import { authDataContext } from '../Context/AuthContext.jsx'
import axios from 'axios'

function MyListing() {
    const { userData } = useContext(userDataContext)
    const { serverUrl } = useContext(authDataContext)
    const [myListings, setMyListings] = useState([])
    const [loading, setLoading] = useState(true)

    const getMyListings = useCallback(async () => {
        try {
            const result = await axios.get(serverUrl + "/api/listing/mylistings", { withCredentials: true })
            setMyListings(result.data)
        } catch (error) {
            console.error("getMyListings error:", error)
        } finally {
            setLoading(false)
        }
    }, [serverUrl])

    useEffect(() => {
        if (userData) {
            getMyListings()
        }
    }, [userData, getMyListings])

    if (loading) {
        return (
            <div>
                <Nav />
                <div className="w-full h-[77vh] flex items-center justify-center">
                    <p>Loading your listings...</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Nav />
            <div className="w-full h-auto min-h-[77vh] flex flex-col items-center justify-start gap-6 mt-[250px] md:mt-[50px] p-4">
                <h1 className="text-2xl font-bold text-center">My Listings</h1>
                {myListings.length === 0 ? (
                    <p className="text-center text-gray-500">You haven't created any listings yet.</p>
                ) : (
                    <div className="w-full flex flex-wrap items-center justify-center gap-6">
                        {myListings.map((list) => (
                            <Card
                                key={list._id}
                                title={list.title}
                                landmark={list.landmark}
                                city={list.city}
                                image1={list.image1}
                                image2={list.image2}
                                image3={list.image3}
                                rent={list.rent}
                                id={list._id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyListing