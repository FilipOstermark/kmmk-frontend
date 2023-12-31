import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { type Album } from "src/model/Album"
import { albumRepositoryInstance } from "src/repository/AlbumRepository"
import { sortAlbumsByRating } from "src/util/util"
import "src/view/TopList/AlbumTopList.css"
import { AlbumTopListItem } from "src/view/TopList/AlbumTopListItem"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner"

export const AlbumTopList: () => JSX.Element = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [albumList, setAlbumList] = useState<Album[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    async function initAlbumList() {
      const albumList = await albumRepositoryInstance.getAll()
      setAlbumList(sortAlbumsByRating(albumList))
      setIsLoading(false)
    }

    initAlbumList()
      .then(() => setIsLoading(false))
      .catch(error => console.error("Failed to init album list", error))
  }, [])

  const display = isLoading ? 
    (
      <>
        <h3>Läser in album...</h3>
        <LoadingSpinner />
      </>
    ) : 
    albumList.map((album, index) => (
      <li key={album.id}>
        <AlbumTopListItem album={album} index={index} />
      </li>
    ))

  return (
    <div className="top-list-wrapper">
      <h1>Topplista</h1>
      <a onClick={() => { navigate('/new-album') }}>+ Nytt album</a>
      <ol className="top-list">{display}</ol>
      <a onClick={() => { navigate('/new-album') }}>+ Nytt album</a>
    </div>
  )
}
