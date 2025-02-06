import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ErrorPage from './pages/ErrorPage'
import NavMenu from './components/NavMenu'
import ExplorePage from './pages/ExplorePage'
import FavoriteMusicPage from './pages/FavoriteMusicPage'
import FavoriteArtistsPage from './pages/FavoriteArtistsPage'
import LatestMusicPage from './pages/LatestMusicPage'

function App() {
  return (
    <div className="app">
      <NavMenu/>
      <div className="container">
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/explore' element={<ExplorePage />} />
          <Route path='/favorite' element={<FavoriteMusicPage />} />
          <Route path='/artists' element={<FavoriteArtistsPage />} />
          <Route path='/latest' element={<LatestMusicPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App
