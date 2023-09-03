import { Album } from 'src/model/Album'
import './css/App.css'
import { AlbumTopListItem } from 'src/view/AlbumTopListItem'
import { useEffect, useState } from 'react'
import { albumRepositoryInstance } from '../repository/AlbumRepository'
import { Routes, Route, Outlet, BrowserRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { NewAlbum } from './NewAlbum'

const Layout: () => JSX.Element = () => {
  return (
    <>
      <header>
        <h1>KM📀MK</h1>
        <nav>
          <ul>
            <li>
              <Link to='/top-list'>Topplista</Link>
            </li>
            <li>
              <Link to='/new-album'>+ Nytt album</Link>
            </li>
          </ul>
        </nav>
      </header>

      <article>
        <Outlet />
      </article>
    </>
  )
}

const App: () => JSX.Element = () => {
  // TODO React router outlet
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index path='top-list' element={<TopList />} />
          <Route path='new-album' element={<NewAlbum />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const TopList: () => JSX.Element = () => {
  const [albumList, setAlbumList] = useState<Album[]>([])
  useEffect(() => {
    async function initAlbumList() {
      const albumList = await albumRepositoryInstance.getAll()
      setAlbumList(albumList ?? [])
    }

    initAlbumList()
  }, [])

  const albumListDisplay = albumList.map(album => {
    return (
      <li>
        <AlbumTopListItem album={album} />
      </li>
    )
  })

  return (
    <>
      <h2>Topplista</h2>
      <button>+ Nytt album</button>
      <ul>{albumListDisplay}</ul>
    </>
  )
}

export default App
