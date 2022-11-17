import React from "react";
import { useState, useEffect } from "react";
import "./Searchbar.css";
import "./layout.css";

function Searchbar() {
    const {datas, setDatas} = useState([])
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then (response => response.json())
        .then (json => setDatas(json))
    })
    return (
        <div className="searchBar">
            <input type="text" name="searchBar" id="searchBar" placeholder="Je recherche une recette..." />
            <div className="search_results">
                <div className="search_result"></div>

            </div>
        </div>
    )
}
export default Searchbar;
