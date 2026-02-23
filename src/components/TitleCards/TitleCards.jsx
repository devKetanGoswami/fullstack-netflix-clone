import React, { useRef, useEffect, useState } from 'react';
import './TitleCards.css';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjUwNDJlZjY3N2NiMmU0NzU1NzVjYjI5OGQzNTAxMyIsIm5iZiI6MTc1MzkzNTk2MC4wMTMsInN1YiI6IjY4OGFmMDU4OWViODc2YTliNTJhNWM5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9qn5R3qdfKhbggcHY8PJE74V75QYJ41EtLa5Zf1tAWM',
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
    
  };

  useEffect(() => {
    const categoryPath = category ? category : 'now_playing';
    const fetchUrl = `https://api.themoviedb.org/3/movie/${categoryPath}?language=en-US&page=1`;
    

    fetch(fetchUrl, options)
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    const currentRef = cardsRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, [category]);

  return (
    <div className='title-cards'>
      <h2>{title ? title : 'Popular On Netflix'}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.length === 0 ? (
          <p>Loading...</p>
        ) : (
          apiData.map((card, index) => (
            <div className='card' key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                alt={card.original_title || 'Movie Poster'}
              />
              <p>{card.original_title}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TitleCards;
