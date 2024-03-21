import React, { useEffect, useState } from 'react';

function Search() {
    const [data, setData] = useState('');
    const [count, setCount] = useState(1);
    const [print , setPrint] = useState([]);
    

    function showMoreResults(event) {
        event.preventDefault(); // Prevent default form submission behavior
        setCount(prevCount => prevCount + 1);
        handleSubmit(event); // Pass the event to handleSubmit
    }
    function handleSubmit(event) {
        event.preventDefault(); 
        imageSearch();
    }

    async function imageSearch() {
       
        const fetchUrl = `https://api.unsplash.com/search/photos?page=${count}&query=${data}&client_id=AaOww2ueeMK4ONlWPHVMLBdUYJJ3ORQ3wpIELrsynAs`;
    
        console.log("Fetching data from:", fetchUrl);
    
        try {
            const response = await fetch(fetchUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            setPrint(responseData)
            console.log(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
    
   console.log(print);
    return (
        <section>
            <h1>Image Search App</h1>
            <form action="" id="box" >
            
                <button onClick={handleSubmit} id="search_btn"><i className="fa-sharp fa-solid fa-magnifying-glass"></i></button>
                <input id="inp" type="text" placeholder="Search for images..." onChange={(e) => {
    setData(e.target.value);
    
     }}/>
            </form>
            
            <div id="search_results">
                {print && print.results && print.results.map((elem, index) => (
                    <div class="imgbox">
                    <img class="imgElement" src={elem.urls.full} width="100px" height="100px"/>
                    <p class="imgname">{elem.alt_description}</p>
                    </div>
                ))}
            </div>
                
            
            <button id="showmore" onClick={showMoreResults}>
                <span>Show more</span>
                <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="37" cy="37" r="35.5" stroke="black" strokeWidth="3"></circle>
                    <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
                </svg>
            </button>
        </section>
    );
}

export default Search;
