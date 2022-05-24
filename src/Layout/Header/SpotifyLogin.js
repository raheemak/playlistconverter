
import { useEffect, useState } from 'react';
import CONFIG from "../../config"
import Button from '@mui/material/Button';
import "./SpotifyLogin.css"
import SpotifyPlaylists from '../../ConvertedPlaylist/SpotifyPlaylists';
const SpotifyLogin = () => {
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
        <div>
            <div>
                {!token ? <Button variant="contained" color="success" >
                    <a className="link" href={`${CONFIG.AUTH_ENDPOINT}?client_id=${CONFIG.CLIENT_ID}&redirect_uri=${CONFIG.REDIRECT_URI}&response_type=${CONFIG.RESPONSE_TYPE}`}>Login
                        to Spotify</a></Button>
                    : <Button variant="contained" color="success" onClick={logout}> Logout</Button>}
            </div>
            <div>
                <SpotifyPlaylists />
            </div>
        </div>
    )
}

export default SpotifyLogin