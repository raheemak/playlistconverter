import './App.css';
import Header from "./Layout/Header/Header.js"
import Form from './Layout/Header/Form';
import ConvertedPlaylist from './ConvertedPlaylist/ConvertedPlaylist';
import PlaylistProvider from './store/PlaylistProvider';
import { useEffect, useState } from 'react';
import axios from "axios";
import CONFIG from "./config"
import SpotifyPlaylists from './ConvertedPlaylist/SpotifyPlaylists';
function App() {

  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])

  const [token, setToken] = useState("")

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)

  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }
  
  return (
    <div className="App">
      <h1>Spotify React</h1>
      {!token ?
        <a href={`${CONFIG.AUTH_ENDPOINT}?client_id=${CONFIG.CLIENT_ID}&redirect_uri=${CONFIG.REDIRECT_URI}&response_type=${CONFIG.RESPONSE_TYPE}`}>Login
          to Spotify</a>
        : <button onClick={logout}>Logout</button>}
    
        <SpotifyPlaylists/>
      <PlaylistProvider>
        <Header></Header>
        <Form />
        <ConvertedPlaylist />
      </PlaylistProvider>
    </div>
  );
}


export default App;
