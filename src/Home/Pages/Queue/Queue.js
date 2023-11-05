import './Queue.css'
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { TokenContext } from '../../Home' // Import TokenContext
import { Button } from '@chakra-ui/react'

function Queue (props) {
  
  // Add props as parameter
  const [buttonPressed, setButtonPressed] = useState(false);
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(true)
  const token = useContext(TokenContext) // Use TokenContext
  const [uri, setUri] = useState("")

  const handleButtonClick = () => {
    // setButtonPressed(true);

    for (let i = 0; i < 5; i++) {
      makePostRequest(i);
    }
  };

  const makePostRequest = (i) => {
    console.log("uri: ", uri[i].uri);
    axios
      .post('https://api.spotify.com/v1/me/player/queue', {
        params: { uri: uri[i].uri },
        headers: { Authorization: `Bearer ${token}` }
        })
      .then(response => {
        // Handle the response data here
        console.log("Track added to playlist: ", response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
      })
  };

  useEffect(() => {
    const genres = [props.genres]
    let seedGenres = genres.length > 1 ? genres.join(',') : genres
    console.log(seedGenres)

    axios
      .get('https://api.spotify.com/v1/recommendations', {
        params: { seed_genres: "pop", limit: 5 },
        headers: { Authorization: `Bearer ${token}` } // Use token from context
      })
      .then(response => {
        setTracks(response.data.tracks) // Access tracks from response.data.tracks
        setUri(response.data.tracks)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        setLoading(false)
      })
      // .post('https://example.com/api/endpoint', {
      //   uris: [tracks.uri],
      // })
      // .then(response => {
      //   // Handle the response data here
      //   console.log("Track added to playlist: ", response.data);
      // })
      // .catch((error) => {
      //   // Handle any errors that occurred during the request
      //   console.error('Error:', error);
      // });
      
  }, [])
  console.log(token)
  return (
    <div className='Queue'>
      This is the queue page
      <ul>
        {tracks.map((track, index) => (
          <li key={index}>{track.name} by {track.artists.name}</li>
        ))}
      </ul>
      <Button onClick={handleButtonClick}>Queue</Button>
    </div>
  )
}

export default Queue
