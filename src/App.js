import './App.css'
import Home from './Home/Home'
import { BrowserRouter } from 'react-router-dom'
import logo from './Images/Spotify_Logo_RGB_Green.png';

function App () {
  return (
    <BrowserRouter>
      <Home />
      <img src={logo} className="SpotifyLogo" alt=""
    style={{ width: '262.4px', height: '78.px' }}/>
    </BrowserRouter>

  )
}


export default App
