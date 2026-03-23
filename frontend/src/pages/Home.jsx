import React, { useContext } from 'react'
import Nav from '../Component/Nav.jsx'
import Card from '../Component/Card.jsx'
import { listingDataContext } from '../Context/ListingContext'

function Home() {
    let {listingdata, setListingData, newlistingdata} = useContext(listingDataContext)
    return (
        <div>
            <Nav />

            <div className="w-[100%] h-[77vh] flex items-center justify-center gap-[25px] flex-wrap mt-[250px] md:mt-[50px]">
                {newlistingdata?.map((list)=>(
                    <Card key={list._id} title={list.title} landmark ={list.landmark} city ={list.city} image1 ={list.image1} 
                    image2 ={list.image2} image3 ={list.image3} rent ={list.rent} id ={list._id}/>
                ))}
            </div>
        </div>
    )
}

export default Home