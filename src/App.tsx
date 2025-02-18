// react
import { Route, Routes } from 'react-router-dom'

// стили
import './App.scss'

// компоненты и страницы
import Footer from './components/Footer'
import Header from './components/Header'
import ContentPage from './pages/ContentPage'
import ErrorPage from './pages/ErrorPage'
import NavMenu from './components/NavMenu'
import ArtistsListPage from './pages/ArtistsListPage'
import MusicListPage from './pages/MusicListPage'

// redux
import { useSelector } from 'react-redux'
import { RootState } from './app/store'
import ProfilePage from './pages/ProfilePage'
import { Context } from './context/Context'
import PlayerApp from './components/PlayerApp'
import { useState } from 'react'

function App() {

  // получение данных с musicData с помощью useSelector и типизации RootState
  const data = useSelector((state: RootState) => state.musicdata.data)

  // текущая музыка (стоит первая музыка по index)
  const [currentSong, setCurrentSong] = useState<any>({});

  // отображение плеера
  const [showPlayer, setShowPlayer] = useState<boolean>(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState<boolean>(false);

  return (
    <Context.Provider value={{ data, currentSong, setCurrentSong, showPlayer, setShowPlayer, showMiniPlayer, setShowMiniPlayer }}>
      <div className="app">
        <NavMenu />
        <div className="container">
          <Header />
          <Routes>
            <Route path='/' element={<ContentPage data={data} type={'homepage'} />} />
            <Route path='/explore' element={<ContentPage data={data} type={'explorepage'} />} />
            <Route path='/profile/:id' element={<ProfilePage />} />
            <Route path='/favorite' element={<MusicListPage />} />
            <Route path='/artists' element={<ArtistsListPage />} />
            <Route path='/latest' element={<MusicListPage />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
          <PlayerApp data={data} />
          <Footer />
        </div>
      </div>
    </Context.Provider>
  )
}

export default App
