import './Home.css' // testing
import {useState, useEffect} from 'react' // testing
import Queue from './Pages/Queue/Queue'
import { Route, Routes, Link } from 'react-router-dom'

function Home () {
  const CLIENT_ID = "cc29af2c2de44d4abe0a84925167e99f"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https:/accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(element => element.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)
  }, [])

  return (
  <>
    <div className='Home'>
      <p>Home page</p>
      <Link to='/queue'>
        <button>Go to Queue</button>
      </Link>
        <button>Go to login</button>
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
      <Routes>
        <Route 
          path='/queue' element={<Queue />} />
      </Routes>
    </div>
  </>
  )
}

export default Home
