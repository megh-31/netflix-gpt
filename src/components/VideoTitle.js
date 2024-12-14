const VideoTitle =({title, overview}) =>{    //getting title and overview from props
    return(
        <div className="pt-[20%] px-20 absolute text-white bg-gradient-to-r from-black w-screen aspect-video">
            <h1 className="font-bold text-5xl">{title}</h1>
            <p className="py-6 text-lg w-1/4">{overview}</p>
            <div>
                <button className="bg-white text-black p-4 px-12 text-xl rounded-lg hover:bg-opacity-75 ">▶️ Play</button>
                <button className="bg-gray-500 text-white p-4 mx-2 px-12 text-xl rounded-lg bg-opacity-30">ℹ️ More info</button>
            </div>
        </div>
    );
};

export default VideoTitle;