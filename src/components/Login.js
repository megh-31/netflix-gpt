import { useState } from "react";
import Header from "./Header";

const Login = () =>{
    const [isSignInForm , setIsSignInForm] = useState(true);

    const toggleSignInForm = () =>{
        setIsSignInForm(!isSignInForm);           //if it is false then show otherwise
    };
    return(
        <div>
        <Header />  
            <div className="absolute">    
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/2bcf01ee-7ef6-4930-b0d5-c6863853c461/web/IN-en-20241125-TRIFECTA-perspective_a47db038-756f-4f26-b1f7-cfc882b98746_small.jpg" alt="background-logo" />
            </div>
            <form className="absolute p-7 w-3/12 my-36 mx-auto right-0 left-0 bg-black text-white bg-opacity-85">
            <h1 className="font-bold text-2xl py-4 px-2"> 
                {isSignInForm ? "Sign In" : "Sign Up"}  {/*If value is true show Sign In else show Sign Up*/}
            </h1>
                {!isSignInForm && (<input type="text" placeholder="Name" className="p-4 my-4 w-full bg-gray-600 rounded-md" /> )}  
                    {/*!isSignInForm means when it is not a sign in form then show this field */}
                <input type="text" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-600 rounded-md" />
                <input type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-600 rounded-md" />
                <button className="p-3 my-6 rounded-md bg-red-700 w-full">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>   
                <p className="my-4 cursor-pointer" onClick={toggleSignInForm}>
                    {isSignInForm ? "New To Netflix? Sign Up Now" : "Already Registered, Sign In Now"}
                </p>  
            </form>
        </div>
    )
}

export default Login;

//Sign In form created also creating a Sign Up form