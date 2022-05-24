import React, {useReducer} from 'react'
import PlaylistContext from "./PlaylistContext"
const defaultPlaylistState = {playlist_link: "", playlist_type:""}

const playlistReducer = (state ,action)=>{
    if (action.type === "UPDATE"){
        return {
            playlist_link: action.playlist.playlist_link, 
            playlist_type: action.playlist.playlist_type
        }
    }
    return; 
}

const PlaylistProvider = (props)=>{
    const [playlistState, dispatchPlaylistAction] = useReducer(playlistReducer, defaultPlaylistState);
    
    const addPlaylistHandler = (playlist) =>{
        console.log ("here!")
        dispatchPlaylistAction ({type: "UPDATE", playlist})
    }

    const playlistContext = {
        playlist_link: playlistState.playlist_link, 
        playlist_type: playlistState.playlist_type, 
        onUpdate: addPlaylistHandler
    }

    return (
        <PlaylistContext.Provider value={playlistContext}>
            {props.children}
        </PlaylistContext.Provider>
    )
}

export default PlaylistProvider ;