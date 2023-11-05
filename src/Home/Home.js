import './Home.css'
import React, { useState, useEffect, createContext } from 'react'
import Queue from './Pages/Queue/Queue'
import Questionnaire from './Pages/Questionnaire/Questionnaire'
import { Routes, Route, Link } from 'react-router-dom'

export const TokenContext = createContext(null) // Export TokenContext

function Home () {
  const CLIENT_ID = 'cc29af2c2de44d4abe0a84925167e99f'
  const REDIRECT_URI = 'http://localhost:3000'
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize' // Fix typo in URL
  const RESPONSE_TYPE = 'token'

  const [token, setToken] = useState('')

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem('token')

    if (!token && hash) {
      token = hash
        .substring(1)
        .split('&')
        .find(element => element.startsWith('access_token'))
        .split('=')[1]

      window.location.hash = ''
      window.localStorage.setItem('token', token)
    }

    setToken(token)
  }, [  ])

    // refresh token that has been previously stored
    /*const refreshToken = localStorage.getItem('refresh_token');
    const url = "https://accounts.spotify.com/api/token";
 
     const payload = {
       method: 'POST',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       body: new URLSearchParams({
         grant_type: 'refresh_token',
         refresh_token: refreshToken,
         client_id: CLIENT_ID
       }),
     }
     const body = await fetch(url, payload);
     const response await body.json();
 
     localStorage.setItem('access_token', response.accessToken);
     localStorage.setItem('refresh_token', response.refreshToken);
   } */
   const getRefreshToken = async () => {
    // Refresh token that has been previously stored
    const refreshToken = localStorage.getItem('refresh_token');
    const CLIENT_SECRET = '1c078e547c4c4835a86bf07e1702e9f1'; // Replace with your actual Spotify Client Secret
    const url = 'https://accounts.spotify.com/api/token';
  
    const payload = new URLSearchParams();
    payload.append('grant_type', 'refresh_token');
    payload.append('refresh_token', refreshToken);
  
    try {
      const response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        },
      });
  
      const data = response.data;
  
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem("expires", data.expires_in)
      } else {
        // Handle the case when the access token cannot be refreshed (e.g., user needs to re-authenticate)
        console.error('Access token refresh failed.');
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
    }
    token = localStorage.getItem("token")
  }

  const refreshTimer = () => {
    const [time, setTime] = useState(localStorage.getItem("expires"))

    useEffect(() => {
      const remaining = setRemainingl(() => {
        if (time > 0) {
          setTime(time - 1)
        }
        else {
          clearInterval(remaining)
        }
      }, 1000)

      return () => {
        clearInterval(remaining)
      }
    }, [time])
  }

  return (

    <>
      <div className='Home'>
        <p>Home page</p>
        <Link to='/queue'>
          <button>Go to Queue</button>
        </Link>
        <Link to='/questionnaire'>
          <button>Go to Questionnaire</button>
        </Link>
        <button>Go to login</button>
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
        <TokenContext.Provider value={token}>
          <Routes>
            <Route path='/queue' element={<Queue />} />
            <Route path = '/questionnaire' element = {<Questionnaire />} />
          </Routes>
        </TokenContext.Provider>
      </div>
    </>
  )
}

export default Home
