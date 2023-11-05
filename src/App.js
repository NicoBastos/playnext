import styles from './App.module.css'
import Home from './Home/Home'
import { BrowserRouter } from 'react-router-dom'
import logo from './Images/Spotify_Logo_RGB_Green.png';

function App () {
  return (
    <BrowserRouter>

      <Home />
      <img src = {logo} id="SpotifyLogo" alt = ""/> 
    </BrowserRouter>

  )
}


export default App
