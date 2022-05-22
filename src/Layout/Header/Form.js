import React, { useState } from "react"
import Button from '@mui/material/Button';

import "./Form.css"
const Container = () => {

    const [showErrorMessage, setShowErrorMessage] = useState (false )
    
    return (
        <div className="container">
            <form>
                <div>
                    <label>Enter playlist link below</label>
                    <label>Enter valid playlist link below</label>
                </div>
                <div> <input type="text" /></div>

                <div className="wrapper">
                    <input type="radio" name="select" id="option-1" checked />
                    <input type="radio" name="select" id="option-2" />
                    <label for="option-1" className="option option-1">
                        <div className="dot"></div>
                        <span>Spotify</span>
                    </label>

                    <label for="option-2" className="option option-2">
                        <div className="dot"></div>
                        <span>Apple Music</span>
                    </label>
                </div>
                <div>

                <Button variant="contained" color="success">Submit</Button>

                </div>
            </form>
        </div>
    )
}

export default Container; 