//creating custom hook for movie trailer

import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constansts";
import { addTrailorVideo } from "../utils/movieSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) =>{  //making dynamic movieId
    const dispatch = useDispatch();
   
    //fetch trailer video from tbdm, making an API call and updating the store with trailer video data
     const getMovieVideos = async() =>{        
        const data = await fetch("https://api.themoviedb.org/3/movie/" +
            movieId +
            " /videos?language=en-US", API_OPTIONS);    //using API_OPTIONS from constants
        const json = await data.json();
        console.log(json)

        const filterData= json.results.filter((video)=> video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0]; //if trailer is not present doing json.results i.e. taking 1st video
       // if filterData.lenth exist then take filterData[0] else take json.results[0] i.e. taking whatever 1st video is present
        console.log(trailer); // there are multiple trailer thus filtering one by one
        dispatch(addTrailorVideo(trailer));   //passing our trailer
     };

     useEffect(()=>{
        getMovieVideos();
     }, []);
}

export default useMovieTrailer;