import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'
import { MdHolidayVillage,MdOutlinePool,MdBedroomParent,MdOutlineBedroomParent } from "react-icons/md";
import { PiFarmFill } from "react-icons/pi";
import { BsFillBuildingsFill } from "react-icons/bs"
import { ImHome3 } from "react-icons/im"
import { FaShopSlash } from "react-icons/fa6"
import { listingDataContext } from '../Context/ListingContext'
import { useContext } from 'react'
export default function ListingPage2() {

    let navigate = useNavigate();
    let {category, setCategory} = useContext(listingDataContext)
  return (
    <div className="w-[100%] h-[100vh] bg-white flex items-center justify-center relative overflow-auto relative">
        <div className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[5%] left-[20px] overflow-auto rounded-[50%] flex items-center justify-center" onClick={() => navigate("/listingpage1")}>
                <FaArrowLeftLong className="w-[25px] h-[25px] text-[white]" /> 
        </div>

        <div className="w-[200px] h-[50px] text-[20px] bg-[#f14242] text-[white] flex items-center justify-center rounded-[30px]  absolute top-[5%] right-[10px] shadow-lg">
              Setup Your Category
        </div>

        <div className="max-w-[900px] w-[100%] h-[550px] overflow-auto bg-white flex items-center justify-start flex-col gap-[40px] mt-[30px]">

            <h1 className="text-[18px] text-[black] md:text-[30px] px-[10px]">Which of these best describes your place?</h1>
        <div className="max-w-[900px] w-[100%] h-[100%] flex flex-wrap items-center justify-center gap-[15px] md:w-[70%]">
            <div className={`w-[180px] h-[100px] flex justify-center items-center flex flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[13px] rounded-lg ${category == "villa" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={(e) => setCategory("villa")}>
                <MdHolidayVillage className="w-[30px] h-[30px] text-[black]"/><h3>Villa</h3>
            </div>

            <div className={`w-[180px] h-[100px] flex justify-center items-center flex flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[13px] rounded-lg ${category == "farm" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={(e) => setCategory("farm")}>
                <PiFarmFill className="w-[30px] h-[30px] text-[black]"/><h3>Farm</h3>
            </div>

            <div className={`w-[180px] h-[100px] flex justify-center items-center flex flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[13px] rounded-lg ${category == "pool" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={(e) => setCategory("pool")}>
                <MdOutlinePool className="w-[30px] h-[30px] text-[black]"/><h3>Pool</h3>
            </div>

            <div className={`w-[180px] h-[100px] flex justify-center items-center flex flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[13px] rounded-lg ${category == "rooms" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={(e) => setCategory("rooms")}>
                <MdBedroomParent className="w-[30px] h-[30px] text-[black]"/><h3>Rooms</h3>
            </div>

            <div className={`w-[180px] h-[100px] flex justify-center items-center flex flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[13px] rounded-lg ${category == "flat" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={(e) => setCategory("flat")}>
                <BsFillBuildingsFill className="w-[30px] h-[30px] text-[black]"/><h3>Flat</h3>
            </div>

            <div className={`w-[180px] h-[100px] flex justify-center items-center flex flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[13px] rounded-lg ${category == "pg" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={(e) => setCategory("pg")}>
                <MdOutlineBedroomParent className="w-[30px] h-[30px] text-[black]"/><h3>PG</h3>
            </div>

            <div className={`w-[180px] h-[100px] flex justify-center items-center flex flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[13px] rounded-lg ${category == "cabin" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={(e) => setCategory("cabin")}>
                <ImHome3 className="w-[30px] h-[30px] text-[black]"/><h3>Cabin</h3>
            </div>

            <div className={`w-[180px] h-[100px] flex justify-center items-center flex flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[13px] rounded-lg ${category == "shop" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={(e) => setCategory("shop")}>
                <FaShopSlash className="w-[30px] h-[30px] text-[black]"/><h3>Shop</h3>
            </div>


        </div>

            <button className="px-[50px] py-[10px] bg-[red] text-[white] rounded-lg mt-[10px] md:px-[100px] absolute right-[10%] bottom-[10%]" onClick={() => navigate("/listingpage3")} disabled={!category}>Next</button>

        </div>

    </div>
  )
}
