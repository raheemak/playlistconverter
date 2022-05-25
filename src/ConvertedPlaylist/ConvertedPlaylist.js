import { useState, useContext } from 'react'
import "./ConvertedPlaylist.css"
import PlaylistContext from '../store/PlaylistContext'


const ConvertedPlaylist = () => {

    const playlistContext = useContext (PlaylistContext)
    return (
        <div className="playlist">
            New playlist will be shown here...
            <div>
                Link entered: {playlistContext.playlist_link}
            </div>
        </div>
    )


}


export default ConvertedPlaylist