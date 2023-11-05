import './Queue.css'
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { TokenContext } from '../../Home' // Import TokenContext

function Queue (props) {
  // Add props as parameter
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(true)
  const token = useContext(TokenContext) // Use TokenContext

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
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        setLoading(false)
      })
  }, [props])
  console.log(token)
  return (
    <div className='Queue'>
      This is the queue page
      <ul>
        {tracks.map((track, index) => (
          <li key={index}>{track.name} by {track.artists.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Queue
