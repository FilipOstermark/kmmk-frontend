import { Album } from "src/model/Album"

export interface AlbumPageProps {
  album: Album
}

export const AlbumPage: (props: AlbumPageProps) => JSX.Element = ({
  album
}: AlbumPageProps) => (
    <>
    <h1>{album.title}</h1>
    <h2>({album.releaseYear})</h2>
    </>
  )
