import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { type Album } from "src/model/Album"
import { albumRepositoryInstance } from "src/repository/AlbumRepository"
import { sortAlbumsByRating } from "src/util/util"
import { AlbumTopListItem } from "src/view/AlbumTopListItem"

export const AlbumTopList: () => JSX.Element = () => {
  const [albumList, setAlbumList] = useState<Album[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    async function initAlbumList() {
      const albumList = await albumRepositoryInstance.getAll()
      setAlbumList(sortAlbumsByRating(albumList))
    }

    initAlbumList().catch(() => { console.error("Failed to init album list") })
  }, [])

  const albumListDisplay = albumList.map(album => (
      <li key={album.id}>
        <AlbumTopListItem album={album} />
      </li>
    ))

  return (
    <>
      <h2>Topplista</h2>
      <a onClick={() => { navigate('/new-album') }}>+ Nytt album</a>
      <ol>{albumListDisplay}</ol>
      <a onClick={() => { navigate('/new-album') }}>+ Nytt album</a>
    </>
  )
}