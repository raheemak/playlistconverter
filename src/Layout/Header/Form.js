import React, { useState, useRef, useContext, useEffect } from "react"
import PlaylistContext from "../../store/PlaylistContext"
import "./Form.css"
import SpotifyLogin from "./SpotifyLogin";
import CheckboxListSecondary from "./CurrentPlaylists";
const Container = () => {

    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [playlist_link, updatePlaylistLink] = useState();
    const [playlist_type, updatePlaylistType] = useState(localStorage.getItem('playlist_type'));
    const [submitPossible, setSubmitPossible] = useState(false);

    const playlistContext = useContext(PlaylistContext)
    const [showSpotifyLogin, setShowSpotifyLogin] = useState(localStorage.getItem('showSpotifyLogin'))
    const submitHandler = () => {

        //playlistContext.onUpdate ({playlist_link, playlist_type})
    }

    const playlistTypeChangeHandler = (event) => {
        updatePlaylistType(event.target.value)
        if (event.target.value === "spotify")
            setShowSpotifyLogin(true)
        else {
            setShowSpotifyLogin(false)
        }
        if (!showErrorMessage)
            setSubmitPossible(true)
    }

    useEffect(()=>{
        localStorage.setItem ('playlist_type', "spotify")
        localStorage.setItem ('showSpotifyLogin', true)
    },[showSpotifyLogin] )

    // const playlistLinkHandler = (event)=>{
    //     if (event.target.value.trim()===""){
    //         setShowErrorMessage (true)
    //         setSubmitPossible (false)
    //         return; 
    //     }
    //     console.log (playlist_type)
    //     if (playlist_type)
    //         setSubmitPossible (true)

    //     setShowErrorMessage(false)
    //     updatePlaylistLink(event.target.value)

    // }
    return (
        <div className="container">
            <form>

                <div className="wrapper">
                    <input type="radio" name="select" id="option-1" value="spotify" onClick={playlistTypeChangeHandler} checked={playlist_type==="spotify"}/>
                    <input type="radio" name="select" id="option-2" value="apple_music" onClick={playlistTypeChangeHandler} />
                    <label for="option-1" className="option option-1" >
                        <div className="dot"></div>
                        <span>Spotify</span>
                    </label>

                    <label for="option-2" className="option option-2" >
                        <div className="dot"></div>
                        <span>Apple Music</span>
                    </label>
                </div>
                <div>
                </div>

                <div>
                    {showSpotifyLogin && <SpotifyLogin />}
                </div>
            </form>
        </div>
    )
}

export default Container; 