import './Queue.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom'
function Queue (props, token) {
  // five songs in the queue after api call
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  //const genre = props.genre;
  useEffect(() => {
    // Join the genres array into a comma-separated string for the seed_genres parameter
    const genres = [props.genres];
    let seedGenres;
    if (genres.length > 1) {
      seedGenres = genres.join(',');
    }
    else {
      seedGenres = genres;
    }

    axios.get('https://api.spotify.com/v1/recommendations', {
      params: {
        seed_genres: seedGenres, // Pass the seed_genres as a query parameter
        // You can also include other query parameters here if needed
      },
      headers: {
        Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with your Spotify access token
      },
    })
      .then(response => {
        setTracks(response.tracks); // Assuming the response contains an array of tracks
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [props]); // Include genres in the dependency array to trigger the request when it changes
  return (
    <div className='Queue'>
      This is the queue page
      <ul>
        {tracks.map((track, index) => (
          <li key={index}>{track.name}</li>
        ))}
      </ul>
    </div>
    
  );
}

export default Queue
