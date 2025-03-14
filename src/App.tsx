// react
import { Route, Routes, useLocation } from 'react-router-dom'

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
// import PrivateRoute from './components/PrivateRoute';

// redux
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './app/store'
import ProfilePage from './pages/ProfilePage'
import { Context } from './context/Context'
import PlayerApp from './components/PlayerApp'
import { useEffect, useState } from 'react'
import AuthPage from './pages/AuthPage'
import supabase from './config/supabaseClient'
import { addingData } from './features/musicdata'
import Loading from './components/Loading'
import PrivateRoute from './components/PrivateRoute'
import ContextMenu from './components/ContextMenu'

interface Song {
  title: string;
  url: string;
  progress?: number;
  length?: number;
}

interface userType {
  id: number,
  name: string,
  email: string,
  password_hash: string,
  image_url: string
}

function App() {

  // получение данных с musicData с помощью useSelector и типизации RootState
  const data = useSelector((state: RootState) => state.musicdata.data)

  const dispatch = useDispatch();

  // текущая музыка (стоит первая музыка по index)
  const [currentSong, setCurrentSong] = useState<any>({});

  // список песниб которые будет воспроизводить плеер
  const [songs, setSongs] = useState<Song[]>([]);

  // отображение плеера
  const [showPlayer, setShowPlayer] = useState<boolean>(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState<boolean>(false);

  // Получаем текущий путь
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/registration';

  // получаем данные о пользователе с локального хранилища
  const localStorageData: userType | [] = JSON.parse(localStorage.getItem('userData') || '[]');

  const [showContextMenu, setShowContextMenu] = useState(true)

  // Получение всех данных с таблиц базы данных Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Запрос на все имеющиеся таблицы в Supabase
        const [usersRes, artistsRes, musicRes, tracksRes] = await Promise.all([
          supabase.from('users').select(),
          supabase.from('favorite_artists').select(),
          supabase.from('favorite_music').select(),
          supabase.from('music_tracks').select(),
        ]);

        // Проверка на ошибки
        if (usersRes.error || artistsRes.error || musicRes.error || tracksRes.error) {
          console.error(usersRes.error || artistsRes.error || musicRes.error || tracksRes.error);
          return;
        }

        const users = usersRes.data;
        const favoriteArtists = artistsRes.data;
        const favoriteMusic = musicRes.data;
        const musicTracks = tracksRes.data;

        // Добавление имени исполнителя в каждый трек
        const musicTracksWithArtistName = musicTracks.map(track => {
          const artist = users.find(user => user.id === track.user_id);
          return {
            ...track,
            artist_name: artist ? artist.name : "Unknown Artist", // Добавляем имя исполнителя
          };
        });

        // Обработка структуры данных
        const supabaseData = users.map(user => {
          // Находим музыкальные треки пользователя
          const userMusicTracks = musicTracksWithArtistName.filter(track => track.user_id === user.id);

          // Находим избранные треки пользователя
          const userFavoriteMusic = favoriteMusic
            .filter(fav => fav.user_id === user.id)
            .map(fav => musicTracksWithArtistName.find(track => track.id === fav.music_id));

          // Находим избранных исполнителей пользователя
          const userFavoriteArtists = favoriteArtists
            .filter(fav => fav.user_id === user.id)
            .map(fav => users.find(artist => artist.id === fav.artist_id));

          return {
            ...user,
            music_tracks: userMusicTracks,
            favorite_music: userFavoriteMusic,
            favorite_artists: userFavoriteArtists,
          };
        });

        // Добавление данных в musicData (Redux)
        dispatch(addingData(supabaseData));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Эффект для управления overflow: hidden (нужен для того, чтобы пользователь не мог листать страницу с отображаемым окном)
  useEffect(() => {
    if (showContextMenu) {
      document.body.style.overflow = 'hidden'; // Блокируем прокрутку
    } else {
      document.body.style.overflow = ''; // Возвращаем прокрутку
    }

    // Очистка при размонтировании
    return () => {
      document.body.style.overflow = '';
    };
  }, [showContextMenu]); // Зависимость от showContextMenu

  return (
    <Context.Provider value={{ data, localStorageData, currentSong, setCurrentSong, showPlayer, setShowPlayer, showMiniPlayer, setShowMiniPlayer, songs, setSongs, showContextMenu, setShowContextMenu }}>
      <div className="app">
        <ContextMenu />
        {!isAuthPage && <NavMenu />}
        <div className="container">
          {!isAuthPage && <Header />}
          {(!data || data.length <= 0) && !isAuthPage ? (<Loading />) : (
            <Routes>
              <Route path='/login' element={<AuthPage />} />
              <Route path='/registration' element={<AuthPage />} />

              <Route element={<PrivateRoute />}>
                <Route path='/' element={<ContentPage data={data} type={'homepage'} />} />
                <Route path='/explore' element={<ContentPage data={data} type={'explorepage'} />} />
                <Route path='/profile/:id' element={<ProfilePage />} />
                <Route path='/favorite' element={<MusicListPage />} />
                <Route path='/artists' element={<ArtistsListPage />} />
                <Route path='/latest' element={<MusicListPage />} />
                <Route path='*' element={<ErrorPage />} />
              </Route>
            </Routes>
          )}
          <PlayerApp data={data} />
          {!isAuthPage && <Footer />}
        </div>
      </div>
    </Context.Provider>
  )
}

export default App
