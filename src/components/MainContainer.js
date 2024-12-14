import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer =() =>{
    const movies = useSelector((store) =>store.movies.nowPlayingMovies);
    
    if (!movies) return;   //If movies are not present or null return from here, it's also known as early return

    const mainMovie = movies[0];
    console.log(mainMovie);

    const{original_title, overview , id} = mainMovie;  //getting this from mainMovie

    return(
        <div>            
            <VideoTitle title={original_title} overview={overview} />
            <VideoBackground movieId={id} />   
        </div>   //getting all these overview, id from the console where all data is passed
    );
};

export default MainContainer;