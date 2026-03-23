import React from 'react'
import { FaEye } from "react-icons/fa6";
import { IoMdEyeOff } from "react-icons/io";
import {useNavigate} from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import {useState} from 'react'
import {authDataContext} from "../Context/AuthContext.jsx"
import {useContext} from 'react'
import axios from 'axios'
import { userDataContext } from '../Context/UserContext.jsx';
function SignUp() {
    
    let [Show, setShow] = useState(false);
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let {serverUrl} = useContext(authDataContext);
    let {userData, setUserData} = useContext(userDataContext);
    let {loading, setLoading} = useContext(authDataContext);
    let navigate = useNavigate();
    const handleLogin = async (e) => {
        setLoading(true);
        try {
            e.preventDefault()
            let result = await axios.post(serverUrl + "/api/auth/login", {
                email,
                password
            }, {withCredentials: true})
            setLoading(false);
            setUserData(result.data);
            navigate("/");
            console.log(result);
        } catch(error) {
            setLoading(false);
            console.log(error);
        }
    }
    return (
        
        <div className='w-[100vw] h-[100vh] flex items-center justify-center relative'>

            <div className="w-[50px] h-[50px] flex justify-center items-center absolute top-[10%] left-[20px] rounded-[50%] bg-[red] text-[white]" onClick={() => navigate("/")}><FaArrowLeftLong className="w-[25px] h-[25px] text-white" /></div>

            <form action="" onSubmit={handleLogin} className="max-w-[900px] w-[90%] h-[600px] flex items-center justify-center flex-col md:items-start">
                <h1 className="text-[30px] text-[black]">Welcome to AirBnb</h1>
                
                <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                    <label htmlFor="email" className="text-[20px]">Email</label>
                    <input type="text" id="email" className="p-[10px] w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg" 
                    required onChange={(e) => setEmail(e.target.value)} value={email}/>
                </div>

                <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] relative">
                    <label htmlFor="password" className="text-[20px]">Password</label>
                    <input type={Show?"password":"text"} id="password" className="p-[10px] w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg " required onChange={(e) => setPassword(e.target.value)} value={password}/>

                    {!Show && (
                        <FaEye className="w-[22px] h-[22px] absolute right-[12%] bottom-[10px]" 
                        onClick={() => setShow(prev => !prev)}
                        />
                    )}

                    {Show && (
                        <IoMdEyeOff  className="w-[22px] h-[22px] absolute right-[12%] bottom-[10px]"
                        onClick={() => setShow(prev => !prev)}
                        />
                    )}

                </div>


                <button className="px-[50px] py-[10px] bg-[red] text-[white] rounded-lg mt-[10px] md:px-[100px]" disabled={loading}>{loading ? "loading.." : "Login"}</button>

                <p className='text-[15px]'>Don't' have an Account? <span className='text-[15px] text-[red] cursor-pointer' onClick={() => navigate("/signup")}>SignUp</span></p>
            </form>
        </div>
    )
}

export default SignUp