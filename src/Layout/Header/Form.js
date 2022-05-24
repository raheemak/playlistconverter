import React, { useState, useRef, useContext } from "react"
import Button from '@mui/material/Button';
import PlaylistContext from  "../../store/PlaylistContext"
import "./Form.css"
const Container = () => {

    const [showErrorMessage, setShowErrorMessage] = useState (false )
    const [playlist_link, updatePlaylistLink]= useState(); 
    const [playlist_type, updatePlaylistType] = useState(); 
    const [submitPossible, setSubmitPossible] = useState(false); 

    const playlistContext = useContext (PlaylistContext)
    
    const submitHandler = ()=>{
        playlistContext.onUpdate ({playlist_link, playlist_type})
    }

    const playlistTypeChangeHandler = (event)=>{
        updatePlaylistType(event.target.value)
        if (!showErrorMessage)
            setSubmitPossible (true)
    }

    const playlistLinkHandler = (event)=>{
        if (event.target.value.trim()===""){
            setShowErrorMessage (true)
            setSubmitPossible (false)
            return; 
        }
        console.log (playlist_type)
        if (playlist_type)
            setSubmitPossible (true)

        setShowErrorMessage(false)
        updatePlaylistLink(event.target.value)

    }
    return (
        <div className="container">
            <form>
                <div>
                {!showErrorMessage && <label>Enter playlist link below</label>}
                {showErrorMessage && <label className="errorLabel">Enter valid playlist link below</label>}
                </div>
                <div> <input type="text" onChange={playlistLinkHandler}/></div>

                <div className="wrapper">
                    <input type="radio" name="select" id="option-1"   value="spotify" onClick = {playlistTypeChangeHandler}/>
                    <input type="radio" name="select" id="option-2" value="apple_music" onClick = {playlistTypeChangeHandler}/>
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

                <Button variant="contained" color="success" onClick = {submitHandler} disabled = {!submitPossible}>Submit</Button>

                </div>
            </form>
        </div>
    )
}

export default Container; 