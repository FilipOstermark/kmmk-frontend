import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from 'src/view/AppLayout'
import { NewAlbum } from 'src/view/NewAlbum/NewAlbum'
import 'src/view/css/App.css'
import { AlbumTopList } from './TopList/AlbumTopList'

const App: () => JSX.Element = () => 
   (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />} >
          <Route index path='' element={<AlbumTopList />} />
          <Route path='new-album' element={<NewAlbum />} />
          <Route path='*' element={<AlbumTopList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )

export default App
