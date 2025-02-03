import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ErrorPage from './pages/ErrorPage'
import NavMenu from './components/NavMenu'

function App() {
  return (
    <div className="app">
      <NavMenu/>
      <div className="container">
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App
