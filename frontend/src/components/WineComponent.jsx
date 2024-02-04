import React from 'react';
import WineOutline from "../assets/project-icons/wine-outline.svg";
import '../index.css';

export default function WineComponent(props) {
    

    //assigning actual image of the wine
    const wine = props.wine;
    let path = "/uploads/" + wine.imagePath;
    return (
        <div className="bottle-image-composition" key={"wine-div" + wine._id.toString()}>
            <img src={ path } alt="Wine image" className="wine-masked-image" key={"wine-img-image" + wine._id.toString()}></img>
            <img src={ WineOutline } alt="Wine outline icon" className="wine-outline-image" key={"wine-img-outline" + wine._id.toString()}></img>   
        </div>
       
    )
}