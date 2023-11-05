import './Home.css'
import Login from './Pages/Login/Login'
import Queue from './Pages/Queue/Queue'
import Questionnaire from './Pages/Questionnaire/Questionnaire'
import { Route, Routes, Link } from 'react-router-dom'

function Home () {
  return (
    <div className='Home'>
      <p>Home page</p>
      <Link to = '/questionnaire'>
        <button>questionnaire</button>
        </Link>
      <Link to ='/queue'>
        <button>Go to Queue</button>
      </Link>
      <Link to='/'>
        <button>Go to login</button>
      </Link>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/queue' element={<Queue />} />
        <Route path = '/questionnaire' element={<Questionnaire />} />
      </Routes>
    </div>
  )
}

export default Home
