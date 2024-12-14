import { createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import { RouterProvider } from "react-router-dom";        //It is required for routing

const Body = () =>{
   
    
    const appRouter = createBrowserRouter([   //setting up the routing
        {
            path: "/",
            element: <Login />
        },

        {
            path: "/browse",
            element: <Browse />
        }
    ])

    return(
        <div>
            <RouterProvider router ={appRouter} />
        </div>
    )
}

export default Body;

//cant use navigate outside of router provider, so it will work inside Login or inside browse or children of browse