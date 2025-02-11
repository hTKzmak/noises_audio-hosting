import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Footer from './components/Footer'
import Header from './components/Header'
import ContentPage from './pages/ContentPage'
import ErrorPage from './pages/ErrorPage'
import NavMenu from './components/NavMenu'
import ArtistsListPage from './pages/ArtistsListPage'
import MusicListPage from './pages/MusicListPage'

function App() {
  return (
    <div className="app">
      <NavMenu/>
      <div className="container">
        <Header />
        <Routes>
          <Route path='/' element={<ContentPage type={'homepage'}/>} />
          <Route path='/explore' element={<ContentPage type={'explorepage'}/>} />
          <Route path='/favorite' element={<MusicListPage />} />
          <Route path='/artists' element={<ArtistsListPage />} />
          <Route path='/latest' element={<MusicListPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App
