import React, { useReducer } from 'react'
import PlaylistContext from "./PlaylistContext"
const defaultPlaylistState = { playlist_link: "", playlist_type: "", playlists: [] }

const playlistReducer = (state, action) => {
    if (action.type === "UPDATE") {
        return {
            playlist_link: action.playlist.playlist_link,
            playlist_type: action.playlist.playlist_type
        }
    } else if (action.type === "UPDATE_PLAYLISTS") {

        return {
            playlists: action.playlists
        }
    }
    return;
}

const PlaylistProvider = (props) => {
    const [playlistState, dispatchPlaylistAction] = useReducer(playlistReducer, defaultPlaylistState);

    const addPlaylistHandler = (playlist) => {
        dispatchPlaylistAction({ type: "UPDATE", playlist })
    }

    const updatePlaylistsHandler = (playlists) => {
        dispatchPlaylistAction({ type: "UPDATE_PLAYLISTS", playlists })
    }

    const playlistContext = {
        playlist_link: playlistState.playlist_link,
        playlist_type: playlistState.playlist_type,
        playlists: playlistState.playlists,
        onUpdate: addPlaylistHandler,
        onUpdatePlaylists: updatePlaylistsHandler
    }

    return (
        <PlaylistContext.Provider value={playlistContext}>
            {props.children}
        </PlaylistContext.Provider>
    )
}

export default PlaylistProvider;