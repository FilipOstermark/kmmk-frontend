import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { type Album } from "src/model/Album"
import { albumRepositoryInstance } from "src/repository/AlbumRepository"
import { sortAlbumsByRating } from "src/util/util"
import { AlbumTopListItem } from "src/view/TopList/AlbumTopListItem"

export const AlbumTopList: () => JSX.Element = () => {
  const [albumList, setAlbumList] = useState<Album[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    async function initAlbumList() {
      const albumList = await albumRepositoryInstance.getAll()
      setAlbumList(sortAlbumsByRating(albumList))
    }

    initAlbumList().catch(error => { 
      console.error("Failed to init album list", error) 
    })
  }, [])

  const albumListDisplay = albumList.map(album => (
      <li key={album.id}>
        <AlbumTopListItem album={album} />
      </li>
    ))

  return (
    <>
      <div className="new-album-page-header">
        <h2>Topplista</h2>
        <Link to='/new-album'>&gt; Nytt album</Link>
      </div>
      <a onClick={() => { navigate('/new-album') }}>+ Nytt album</a>
      <ol>{albumListDisplay}</ol>
      <a onClick={() => { navigate('/new-album') }}>+ Nytt album</a>
    </>
  )
}
