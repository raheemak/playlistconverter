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

 
  return (
    <div className="App">

      <PlaylistProvider>
        <Header></Header>
        <Form />
        <ConvertedPlaylist />
      </PlaylistProvider>
    </div>
  );
}


export default App;
