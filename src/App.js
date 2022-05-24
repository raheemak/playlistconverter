import './App.css';
import Header from "./Layout/Header/Header.js"
import Form from './Layout/Header/Form';
import ConvertedPlaylist from './ConvertedPlaylist/ConvertedPlaylist';
import PlaylistProvider from './store/PlaylistProvider';
import { useEffect, useState } from 'react';
import axios from "axios";

function App() {
  const CLIENT_ID = "b762d16ff52d44a0a81bdbbc12850e60"
  const REDIRECT_URI = "http://localhost:3000/callback"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"


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
  const searchArtists = async (e) => {
    e.preventDefault()
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "artist"
      }
    })

    setArtists(data.artists.items)
  }

  const renderArtists = () => {
    return artists.map(artist => (
      <div key={artist.id}>
        {artist.images.length ? <img width={"50%"} src={artist.images[0].url} alt="" /> : <div>No Image</div>}
        {artist.name}
      </div>
    ))
  }
  return (
    <div className="App">
      <h1>Spotify React</h1>
      {!token ?
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
          to Spotify</a>
        : <button onClick={logout}>Logout</button>}
      <form onSubmit={searchArtists}>
        <input type="text" onChange={e => setSearchKey(e.target.value)} />
        <button type={"submit"}>Search</button>
      </form>
      {renderArtists()}

      <PlaylistProvider>
        <Header></Header>
        <Form />
        <ConvertedPlaylist />
      </PlaylistProvider>
    </div>
  );
}


export default App;
