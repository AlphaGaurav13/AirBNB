import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ListingPage1 from './pages/ListingPage1.jsx'
import ListingPage2 from './pages/ListingPage2.jsx'
import ListingPage3 from './pages/ListingPage3.jsx'
import MyListing from './pages/MyListing.jsx'
import MyBookings from './pages/MyBookings.jsx'
import ViewCard from './pages/ViewCard.jsx'
import { useContext } from 'react'
import { userDataContext } from './Context/UserContext.jsx'

function App() {

  const { userData } = useContext(userDataContext);
  return(
    <>
    <Routes>
      <Route path = '/' element={<Home/>}/>
      <Route path = '/login' element={<Login/>}/>
      <Route path = '/signup' element={<SignUp/>}/>
      <Route path = '/listingpage1' element={userData != null ? <ListingPage1/> : <Navigate to={"/login"}/>}/>
      <Route path = '/listingpage2' element={userData != null ? <ListingPage2/> : <Navigate to={"/login"}/>}/>
      <Route path = '/listingpage3' element={userData != null ? <ListingPage3/> : <Navigate to={"/login"}/>}/>
      <Route path = '/mylisting' element={userData != null ? <MyListing/> : <Navigate to={"/login"}/>}/>
      <Route path = '/mybookings' element={userData != null ? <MyBookings/> : <Navigate to={"/login"}/>}/>
      <Route path = '/viewcard/:id' element={userData != null ? <ViewCard/> : <Navigate to={"/login"}/>}/>
    </Routes>
    </>
  )
}


export default App 