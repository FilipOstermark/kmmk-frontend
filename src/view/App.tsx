import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'src/view/App.css'
import { AppLayout } from 'src/view/AppLayout'
import { NewAlbum } from 'src/view/NewAlbum/NewAlbum'
import { AccountSettings } from './Account/AccountSettings'
import { Login } from './Login/Login'
import { OAuth2TokenHandler } from './Login/OAuth2TokenHandler'
import { PrivateRoute } from './Login/PrivateRoute'
import { PrivacyPolicy } from './Privacy/PrivacyPolicy'
import { AlbumTopList } from './TopList/AlbumTopList'

const App: () => JSX.Element = () => (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />} >
          <Route path='login' element={<Login />} />
          <Route path='oauth2/token' element={<OAuth2TokenHandler />} />
          <Route path='privacy-policy' element={<PrivacyPolicy />} />

          <Route index path='' element={<PrivateRoute><AlbumTopList /></PrivateRoute>} />
          <Route path='new-album' element={<PrivateRoute><NewAlbum /></PrivateRoute>} />
          <Route path='account' element={<PrivateRoute><AccountSettings /></PrivateRoute>} />
          <Route path='*' element={<PrivateRoute><AlbumTopList /></PrivateRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )

export default App
