import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground =({movieId}) =>{
    const trailerVideo = useSelector(store=> store.movies.trailerVideo)
    useMovieTrailer(movieId);   //importing the custom hook

    return <div>
         <iframe className="w-screen aspect-video"  //aspect-video keeping aspect ration in screen
        src={"https://www.youtube.com/embed/" + trailerVideo?.key + "?&autoplay=1&mute=1"}  // &autoplay=1&mute=1- adding this for autoplaying the youtubr vdo
        title="YouTube video player" frameborder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" allowFullScreen>
        </iframe>
        </div>;
    
}

export default VideoBackground