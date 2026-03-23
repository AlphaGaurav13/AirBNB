import React, { useContext } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext'

export default function ListingPage3() {

  let navigate = useNavigate();
   let {
       title, setTitle,
          description, setDescription,
          frontEndImage1, setFrontEndImage1,
          frontEndImage2, setFrontEndImage2,
          frontEndImage3, setFrontEndImage3,
          backEndImage1, setBackEndImage1,
          backEndImage2, setBackEndImage2,
          backEndImage3, setBackEndImage3,
          rent, setRent,
          city, setCity,
          landmark, setLandmark,
          category, setCategory,
          handleAddListing,
          adding, setAdding
    } = useContext(listingDataContext);

  return (
    <div className="w-[100%] h-[100vh] bg-white flex items-center flex-col justify-center overflow-auto relative">
      
      <div className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[5%] left-[20px] overflow-auto rounded-[50%] flex items-center justify-center" onClick={() => navigate("/listingpage2")}>

                      <FaArrowLeftLong className="w-[25px] h-[25px] text-[white]" /> 
      </div>


      <div className="w-[95%]  flex items-start justify-start text-[25px] md:w-[80%] mb-[10px]">
        <h1 className="text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden">
          {`In ${landmark.toUpperCase()}, ${city.toUpperCase()}`}
        </h1>
      </div>


      <div className="w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row bg-[black]">
            <div className="w-[100%] h-[35%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center border-[2px] border-[white] bg-[red]">
                {frontEndImage1 && (
  <img src={frontEndImage1} alt="" className="w-[100%]" />
)}
            </div>

            <div className="w-[100%] h-[30%] flex items-center justify-center md:w-[30%] md:h-[100%] md:flex-col">
              <div className="w-[100%] h-[100%]  overflow-hidden flex items-center justify-center border-[2px] border-[white]">
                  {frontEndImage2 && (
  <img src={frontEndImage2} alt="" className="w-[100%]" />
)}
              </div>
              <div className="w-[100%] h-[100%]  overflow-hidden flex items-center justify-center border-[2px] border-[white]">
                  {frontEndImage3 && (
  <img src={frontEndImage3} alt="" className="w-[100%]" />
)}
              </div>
            </div>
      </div>

      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%]  md:text-[25px]">
              {`${title.toUpperCase()},  ${category.toUpperCase()}, ${landmark.toUpperCase()}`}
      </div>
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%]  md:text-[25px]">
              {`${description.toUpperCase()}`}
      </div>
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%]  md:text-[25px]">
              {`Rs.${rent.toUpperCase()}/Day`}
      </div>


      <div className="w-[95%] h-[50px] flex items-center justify-start">
        <button className="px-[50px] py-[10px] bg-[red] text-[white] rounded-lg mt-[10px] md:px-[100px] absolute right-[10%] bottom-[10%]" onClick={handleAddListing} disabled={adding}>{adding ? "adding..." : "add listing"}</button>
      </div>
    </div>
  )
}
