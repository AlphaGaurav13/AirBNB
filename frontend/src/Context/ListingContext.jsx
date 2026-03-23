import React, { createContext } from 'react'
import { useState, useContext, useEffect } from 'react';
import { authDataContext } from './AuthContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export const listingDataContext = createContext();

 function ListingContext({children}) {
    let navigate = useNavigate();
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [frontEndImage1, setFrontEndImage1] = useState("");
    let [frontEndImage2, setFrontEndImage2] = useState("");
    let [frontEndImage3, setFrontEndImage3] = useState("");
    let [backEndImage1, setBackEndImage1] = useState("");
    let [backEndImage2, setBackEndImage2] = useState("");
    let [backEndImage3, setBackEndImage3] = useState("");
    let [rent, setRent] = useState("");
    let [city, setCity] = useState("");
    let [landmark, setLandmark] = useState("");
    let [adding, setAdding] = useState(false);
    let [category, setCategory] = useState("");  
    let {serverUrl} = useContext(authDataContext); 
    let [listingdata, setListingData] = useState([]);
    let [newlistingdata, setNewListingData] = useState([]);
    let [searchQuery, setSearchQuery] = useState("");

    const searchListings = (query) => {
      const normalizedQuery = query.trim().toLowerCase();
      setSearchQuery(query);

      if (!normalizedQuery) {
        return setNewListingData(listingdata);
      }

      const filtered = listingdata.filter((item) => {
        const city = item.city?.toLowerCase() || "";
        const title = item.title?.toLowerCase() || "";
        const landmark = item.landmark?.toLowerCase() || "";
        const category = item.category?.toLowerCase() || "";

        return (
          city.includes(normalizedQuery) ||
          title.includes(normalizedQuery) ||
          landmark.includes(normalizedQuery) ||
          category.includes(normalizedQuery)
        );
      });

      setNewListingData(filtered);
    };

    const handleAddListing = async () => {
        setAdding(true);
        try {
             let formData = new FormData();
             formData.append("title", title);
             if (backEndImage1) formData.append("image1", backEndImage1);
             if (backEndImage2) formData.append("image2", backEndImage2);
             if (backEndImage3) formData.append("image3", backEndImage3);
             formData.append("description", description);
             formData.append("rent", rent);
             formData.append("city", city);
             formData.append("landmark", landmark);
             formData.append("category", category);


             let result = await axios.post( serverUrl + "/api/listing/add", formData, {
                withCredentials: true
             })
             console.log(serverUrl);
             setAdding(false);
             console.log(result);
             navigate("/");
             setTitle("")
             setDescription("")
             setFrontEndImage1(null)
             setFrontEndImage2(null)
             setFrontEndImage3(null)
             setBackEndImage1(null)
             setBackEndImage2(null)
             setBackEndImage3(null)
             setRent("")
             setCity("")
             setLandmark("")
             setCategory("")

        }catch(error) {
            // return res.status(500).json(message:`AddListing error ${error}`)
            setAdding(false);
            console.log(error);
        }
    } 



    const getListing = async() => {
      try {
        let result = await axios.get(serverUrl + "/api/listing/get", {withCredentials: true});
        setListingData(result.data);
        setNewListingData(result.data);
      }catch(error) {
        console.log(error);
      }
    }

    useEffect(() => {
      getListing()
    }, [adding])

    let value={
        title, setTitle,
        description, setDescription,
        frontEndImage1, setFrontEndImage1,
        frontEndImage2, setFrontEndImage2,
        frontEndImage3, setFrontEndImage3,
        backEndImage1, setBackEndImage1,
        backEndImage2, setBackEndImage2,
        backEndImage3, setBackEndImage3,
        city, setCity,
        rent, setRent,
        landmark, setLandmark,
        category, setCategory,
        handleAddListing,
        adding, setAdding,
        listingdata, setListingData,
        getListing,
        newlistingdata, setNewListingData,
        searchQuery, setSearchQuery,
        searchListings

    }
  return (
    <div>
      <listingDataContext.Provider value={value}>
        {children}
      </listingDataContext.Provider>
    </div>
  )
}


export default ListingContext