import { Album } from "src/model/Album"

export interface AlbumPageProps {
  album: Album
}

export const AlbumPage: (props: AlbumPageProps) => JSX.Element = ({
  album
}: AlbumPageProps) => {
  return (
    <>
    <h1>{album.title}</h1>
    <h2>({album.releaseDate})</h2>
    </>
  )
}
