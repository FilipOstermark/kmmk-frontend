import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { type Album } from "src/model/Album"
import { albumRepositoryInstance } from "src/repository/AlbumRepository"
import { sortAlbumsByRating } from "src/util/util"
import "src/view/TopList/AlbumTopList.css"
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

  const albumListDisplay = albumList.map((album, index) => (
      <li key={album.id}>
        <AlbumTopListItem album={album} index={index} />
      </li>
    ))

  return (
    <>
      <h1>Topplista</h1>
      <a onClick={() => { navigate('/new-album') }}>+ Nytt album</a>
      <ol className="top-list">{albumListDisplay}</ol>
      <a onClick={() => { navigate('/new-album') }}>+ Nytt album</a>
    </>
  )
}
