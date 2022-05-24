
import axios from "axios";
import { useEffect, useState } from 'react';


const SpotifyPlaylists = () => {
    const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

    const [data, setData] = useState({});
    const [token, setToken] = useState("")

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
    }, []);

    const handleGetPlaylists = () => {
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
    };

    return (
        <>
            <button onClick={handleGetPlaylists}>Get Playlists</button>
            {data?.items ? data.items.map((item) => <p>{item.name}</p>) : null}
        </>
    )

}

export default SpotifyPlaylists