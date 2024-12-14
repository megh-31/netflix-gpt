import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constansts";

//Creating Custom hooks
const useNowPlayingMovies= ()=>{
    //Fetch data from TMDB API and update store
    const dispatch = useDispatch();

    const getNowPlayingMovies = async() =>{         //we are using async await as we are going to fetch
        const data = await fetch ('https://api.themoviedb.org/3/movie/now_playing' , API_OPTIONS);
           const json = await data.json();         //this will return a promise and I have to convert this to json
           console.log(json.results); 
            dispatch(addNowPlayingMovies(json.results));     //dispatching an action and pushing json.results as it has those 20 movies
    };

//Making API call inside useEffect so that I can call this only once whenever my component is rendered & use empty parenthesis or u will make infinite API calls
useEffect(() =>{
    getNowPlayingMovies();     // creating movieSlice and putting into redux store
}, [])
}

export default useNowPlayingMovies;