


import { useEffect, useState, useContext } from 'react';
import CONFIG from "../../config"
import Button from '@mui/material/Button';
import "./SpotifyLogin.css"
import axios from "axios";
import PlaylistContext from "../../store/PlaylistContext"
import CheckboxListSecondary from "./CurrentPlaylists"

const developerToken= 'MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgBaFjwU66KmxsEyZ0fZBhQeLa6r3zJN2719590BWVJG6gCgYIKoZIzj0DAQehRANCAATDoo3NIqmmctM+eo+ei1IWde7+9SMqi7F2zIh9emVbhm2YldqD5U4GxwhsA2xpAka4FPDDS4xaTwE4zg7NhBX1'

export default class AppleMusicLogin {

    static sharedProvider() {
        if(!AppleMusicLogin.instance) {
            AppleMusicLogin.instance = new AppleMusicLogin();
        }
        return AppleMusicLogin.instance;
    }

    configure() {
      if(!AppleMusicLogin.instance) {
        AppleMusicLogin.instance = new AppleMusicLogin();
    }
    
        const setupMusicKit = new Promise((resolve) => {
            document.addEventListener("musickitloaded", () => {
              const musicKitInstance = window.MusicKit.configure({
                developerToken: developerToken,
                app: {
                  name: "MusicKit Web App",
                  build: "1.0.0",
                },
              });
              delete window.MusicKit; // clear global scope
              resolve(musicKitInstance);
            });
          });
    }

    getMusicInstance() {
        return  window.MusicKit.getInstance();
    }
}