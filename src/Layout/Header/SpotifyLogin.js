
import { useEffect, useState, useContext } from 'react';
import CONFIG from "../../config"
import Button from '@mui/material/Button';
import "./SpotifyLogin.css"
import axios from "axios";
import PlaylistContext from "../../store/PlaylistContext"
import CheckboxListSecondary from "./CurrentPlaylists"
const SpotifyLogin = () => {
    const [token, setToken] = useState("")
    const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
    const [data, setData] = useState({});
    const playlistContext = useContext(PlaylistContext)
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
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
        
        //TODO: temporary workaround for now ...
        handleGetPlaylists()
    }, [token]);

    const handleGetPlaylists = () => {
        setTimeout(() => {
            axios
                .get(PLAYLISTS_ENDPOINT, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    setData(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            const formattedData = data.items.map ((item)=>{return {name: item.name, image:item.images[0].url}})
            console.log ("printing formatted data")
            console.log (formattedData)
            playlistContext.onUpdatePlaylists(formattedData)
        }, 100)

        
    }


    return (
        <div>
            <div>
                {!token ? <Button variant="contained" color="success" >
                    <a className="link" href={`${CONFIG.AUTH_ENDPOINT}?client_id=${CONFIG.CLIENT_ID}&redirect_uri=${CONFIG.REDIRECT_URI}&response_type=${CONFIG.RESPONSE_TYPE}`}>Login
                        to Spotify</a></Button>
                    : <div><Button variant="contained" color="success" onClick={logout}> Logout</Button>  <Button onClick={handleGetPlaylists}>Get Playlists</Button>  <div className="center">
                    {playlistContext.playlists.length>0 && <CheckboxListSecondary/>}
                </div>
                        </div>}
            </div>
      
        </div>
    )
}

export default SpotifyLogin