import React from 'react'
import '../index.css';

export default function WineDeal(props) {
    const { wineName, wineStore, wineLocation, wineStatus, winePrice, wineLink } = props.wine
    return (
        <div className="wine-deal">
            <p className="deal-p" id="deal-name">{wineName}</p>
            <p className="deal-p" id="deal-store">{wineStore}</p>
            {/* <p className="deal-p" id="deal-location">{wineLocation}</p> */}
            <p className="deal-p" id="deal-status">{wineStatus}</p>
            <p className="deal-p" id="deal-price">{winePrice}</p>
            <a href={wineLink} className="deal-a" id="deal-link">Visit</a>
        </div>
       
    )
}