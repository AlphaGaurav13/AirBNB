import React, { useState,useContext } from 'react'
import logo from "../assets/logo.jpg"
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdWhatshot } from "react-icons/md";
import { MdHolidayVillage } from "react-icons/md";
import { PiFarmFill } from "react-icons/pi";
import { MdOutlinePool } from "react-icons/md";
import { MdBedroomParent } from "react-icons/md";
import { BsFillBuildingsFill } from "react-icons/bs";
import { MdOutlineBedroomParent } from "react-icons/md";
import { ImHome3 } from "react-icons/im";
import { FaShopSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom"
import {authDataContext} from "../Context/AuthContext"
import axios from "axios"
export default function Nav() {
    let navigate = useNavigate();
    let [showpopup, setShowpopup] = useState(false);
    let {serverUrl} = useContext(authDataContext);
    const handlelogOut = async () => {
        try {
            let result = await axios.post(serverUrl + "/api/auth/logout", {withcredentials: true});
            console.log(result);
        } catch(error) {
                console.log(error);
        }
    }
  return (
    <div className="">
      <div className="w-[100%] min-h-[80px] border-b-[1px] border-[#c7c6c6] flex justify-between items-center p-[20px]">
        
        <div className=""><img src={logo} alt="" className="w-[60px] border-[5px]  rounded-[50%]"/></div>

        <div className="w-[35%] relative hidden md:block">
        <input type="text" className="w-[100%] px-[30px] py-[10px] border-[2px] border-[#bdbaba] outline-none overflow-auto rounded-[30px] text-[17px] " placeholder="Any Where | Any Location | Any City"/>
        <button className="absolute p-[10px] bg-[red] rounded-[50px] right-[3%] top-[5px]"><IoSearch className="w-[20px] h-[20px] text-[white]"/>
        </button>

        </div>


        <div className="flex items-center justify-center gap-[10px] relative">
            <span className="text-[18px] cursor-pointer rounded-[50px] hover:bg-[#ded9d9] px-[8px] py-[5px] hidden md:block">List your home</span>
            <button className="px-[20px] py-[10px] flex items-center justify-center gap-[5px] border-[1px] border-[#8d8c8c] rounded-[50px] hover:shadow-lg" onClick={() => setShowpopup(prev => !prev)}>
                <span><GiHamburgerMenu className="w-[20px] h-[20px]"/></span>
                <span><CgProfile className="w-[23px] h-[23px]"/></span>
            </button>


            {showpopup && <div className="w-[220px] h-[250px] absolute bg-slate-200 top-[110%] right-[3%] border-[1px] border-[#aaa9a9] z-10 rounded-lg md:right-[10%]">
                <ul className="w-[100%] h-[100%] text-[17px] flex items-start justify-around flex-col py-[10px]">
                    <li className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3]" onClick={() => navigate("/login")}>Login</li>
                    <li className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3]" onClick={handlelogOut}>Logout</li>
                    <div className="w-[100%] h-[1px] bg-[#c1c0c0]"></div>
                    <li className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3]">List your Home</li>
                    <li className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3]">My Listing</li>
                    <li className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3]">Check Booking</li>
                </ul>
            </div>}
        </div>
      </div>

      <div className="w-[100%] h-[60px] flex items-center justify-center block md:hidden">
        <div className="w-[55%] relative ">
        <input type="text" className="w-[100%] px-[30px] py-[10px] border-[2px] border-[#bdbaba] outline-none overflow-auto rounded-[30px] text-[17px] " placeholder="Any Where | Any Location | Any City"/>
        <button className="absolute p-[10px] bg-[red] rounded-[50px] right-[3%] top-[5px]"><IoSearch className="w-[20px] h-[20px] text-[white]"/>
        </button>
      </div>

      </div>


        <div className="w-[100%] h-[85px]  flex justify-start items-center cursor-pointer gap-[40px] overflow-auto md:justify-center p-[15px]">

            <div className="flex flex-col justify-center items-center  hover:border-b-[5px] border-[#a6a5a5]">
                <MdWhatshot className="w-[30px] h-[30px] text-black"/>
                <h3>Trending</h3>
            </div>

            <div className="flex flex-col justify-center items-center  hover:border-b-[5px] border-[#a6a5a5]">
                <MdHolidayVillage  className="w-[30px] h-[30px] text-black"/>
                <h3>Villa</h3>
            </div>

            <div className="flex flex-col justify-center items-center  hover:border-b-[5px] border-[#a6a5a5] text-nowrap">
                <PiFarmFill  className="w-[30px] h-[30px] text-black"/>
                <h3>Farm House</h3>
            </div>


            <div className="flex flex-col justify-center items-center  hover:border-b-[5px] border-[#a6a5a5] text-nowrap">
                <MdOutlinePool  className="w-[30px] h-[30px] text-black"/>
                <h3>Pool House</h3>
            </div>


            <div className="flex flex-col justify-center items-center  hover:border-b-[5px] border-[#a6a5a5]">
                <MdBedroomParent  className="w-[30px] h-[30px] text-black"/>
                <h3>Rooms</h3>
            </div>


            <div className="flex flex-col justify-center items-center  hover:border-b-[5px] border-[#a6a5a5]">
                <BsFillBuildingsFill className="w-[30px] h-[30px] text-black"/>
                <h3>Flat</h3>
            </div>


            <div className="flex flex-col justify-center items-center  hover:border-b-[5px] border-[#a6a5a5]">
                <MdOutlineBedroomParent  className="w-[30px] h-[30px] text-black"/>
                <h3>PG</h3>
            </div>


            <div className="flex flex-col justify-center items-center  hover:border-b-[5px] border-[#a6a5a5]">
                <ImHome3  className="w-[30px] h-[30px] text-black"/>
                <h3>Cabins</h3>
            </div>


            <div className="flex flex-col justify-center items-center  hover:border-b-[5px] border-[#a6a5a5]">
                <FaShopSlash  className="w-[30px] h-[30px] text-black"/>
                <h3>Shop</h3>
            </div>

        </div>
    </div>
  )
}
