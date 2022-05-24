import React, {useReducer} from 'react'

const PlaylistContext = React.createContext({
    playlist_link: "", 
    playlist_type: "", 
    addPlaylist: (item, type)=>{}
})

export default PlaylistContext