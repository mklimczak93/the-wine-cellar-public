import React from 'react'
import '../index.css';

export default function WineDeal(props) {
    const { available, wineNameInShop, winePriceInShop, shopName, wineURLInShop } = props.wine;

    const number = props.number;

    return (
        <div className="wine-deal">
            <p className={available ? "deal-p" : "deal-p disabled-text"} id="deal-number">{number}</p>
            <div className="wine-deal-sub-div">
                <h4 className={available ? "deal-p" : "deal-p disabled-text"} id="deal-name">{wineNameInShop}</h4>
                <p className={available ? "deal-p" : "deal-p disabled-text"} id="deal-store">{shopName}</p>
            </div>
            <p className={available ? "deal-p" : "deal-p disabled-text"} id="deal-status">{available ? "Available" : "Not available"}</p>
            <p className={available ? "deal-p" : "deal-p disabled-text"} id="deal-price">{winePriceInShop ? `${Number(winePriceInShop).toFixed(2)} PLN`  : "---"} </p>
            <a href={wineURLInShop} className={available ? "deal-a" : "deal-a disabled-link"} id="deal-link">
                <p>Visit</p>
            </a>
        </div>
       
    )
}