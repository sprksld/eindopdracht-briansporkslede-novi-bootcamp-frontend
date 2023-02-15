import "./ShowDefaultPicture.css";
import React from 'react';
import path2url from "../../helpers/path2url";

function ShowDefaultPicture() {
        return (
            <img className="default-picture" src={path2url("/download/default.jpg")} alt="&nbsp; &larr; na het uploaden komt hier een afbeelding"/>
        )
}

export default ShowDefaultPicture;