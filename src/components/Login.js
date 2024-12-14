import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../utils/firebase";
import {updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser} from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constansts";

const Login = () =>{
    const [isSignInForm , setIsSignInForm] = useState(true);
    const [errorMessage , setErrorMessage] = useState(null);
    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);     // doing a reference for email
    const password = useRef(null);    //useRef is used to reference a field or tag, suppose input tag

    const handleButtonClick =() =>{
        //Validate the form data
            const message= checkValidData(email.current.value , password.current.value);  //We are getting path current.value from console, after using this val will be printed in console
            setErrorMessage(message);
            if(message) return ;    // if message is here return from here dont go ahead return from here

            //Sign Up Logic getting from Firebase
            if(!isSignInForm){
                createUserWithEmailAndPassword(auth, email.current.value , password.current.value )
                    .then((userCredential) => {             // Signed up 
                        const user = userCredential.user;
                            updateProfile(user, {
                            displayName: name.current.value ,
                            photoURL: USER_AVATAR // Not a JSX so no need to wrap in {}
                  })
                  .then(() => {
                    const {uid ,email, displayName , photoURL} = auth.currentUser;   //fetch updated value from auth after sign in we need to diplay it so once authentication done after that only
                    dispatch(addUser({uid: uid, email: email, displayName: displayName , photoURL:photoURL }));                     
                  }).catch((error) => {
                    setErrorMessage(errorMessage)
                  });
                console.log(user);
                })
                
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode +"-" +errorMessage)
                });
            }

            else{
                //Sign In logic from Firebase
                signInWithEmailAndPassword(auth,email.current.value , password.current.value )
                    .then((userCredential) => {    // Signed in 
                        const user = userCredential.user;
                        

                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setErrorMessage(errorCode +"-" +errorMessage)

                    });

            }
    };

    const toggleSignInForm = () =>{
        setIsSignInForm(!isSignInForm);           //if it is false then show otherwise
    };
    return(
        <div>
        <Header />  
            <div className="absolute">    
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/2bcf01ee-7ef6-4930-b0d5-c6863853c461/web/IN-en-20241125-TRIFECTA-perspective_a47db038-756f-4f26-b1f7-cfc882b98746_small.jpg" alt="background-logo" />
            </div>
            <form onSubmit={(e) => e.preventDefault()}  //When clicking on the submit button it prevents from submitiing 
                className="absolute p-7 w-3/12 my-36 mx-auto right-0 left-0 bg-black text-white bg-opacity-85">
            <h1 className="font-bold text-2xl py-4 px-2"> 
                {isSignInForm ? "Sign In" : "Sign Up"}  {/*If value is true show Sign In else show Sign Up*/}
            </h1>
                    {/*!isSignInForm means when it is not a sign in form then show this field */}
                {!isSignInForm && (<input ref={name} type="text" placeholder="Name" className="p-4 my-4 w-full bg-gray-600 rounded-md" /> )}  

                <input ref={email} type="text" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-600 rounded-md" />
                <input ref={password} type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-600 rounded-md" />
                <p className="text-red-500 font-bold p-2">{errorMessage}</p>

                <button className="p-3 my-6 rounded-md bg-red-700 w-full" onClick={handleButtonClick}>
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