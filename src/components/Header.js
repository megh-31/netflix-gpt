import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constansts";

const Header = () =>{
    const navigate =useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user)

    const handleSignOut =() =>{
        signOut(auth).then(() => {})
        .catch((error) => {
             navigate("/error");
          });
    }
// Header is inside of router provider, so it will work inside Login or browse or children of browse or header as it is present in all page thus using it here
    useEffect(()=>{
       const unsubscribe= onAuthStateChanged(auth, (user) => {       //onAuthState logic is called whenever the header component is loaded 
            if (user) {                     // User is signed in case 
              const {uid ,email, displayName , photoURL} = user;
              dispatch(addUser({uid: uid, email: email, displayName: displayName , photoURL:photoURL }));  
              navigate("/browse");          // As user is logged in even if I try to go to "/" i.e. login page it will redirect to browse page
            } 
            else {                         // User is signed out case
              dispatch(removeUser());   
              navigate("/");               // As user logged out it will redirect to login page even if I try to use url as "/browse"
            }
          });
          return() => unsubscribe(); //unsubscribe when header component unloads , basically unsubscribe when component unmounts
    }, []);          // Using useEffect bcz we want to do this only once

    return(
        <div className="absolute w-screen px-2 py-8 bg-gradient-to-b from-black z-10 flex justify-between">
            <img className="w-44"src={LOGO} alt="logo" />
            {user && (
                <div className="flex p-2">
                <img className="w-10 h-10" src={user?.photoURL} alt="usericon" />
                <button onClick={handleSignOut} className="font-bold text-white">
                    (Sign Out)
                </button>
            </div>
            )}
        </div>
    );
};

export default Header;