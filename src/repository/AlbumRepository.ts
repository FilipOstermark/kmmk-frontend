import { Album } from "src/model/Album"

export interface AlbumRepository {
  getAll: () => Promise<Array<Album>>
  add: (album: Album) => Promise<void>
  remove: (albumId: string) => Promise<void>
}

// TODO Remove this when real DB available
const dummyData: Array<Album> = [
  {
    id: "1",
    title: "Purple Rain",
    releaseYear: 1984,
    rating: 6.5,
    discussionDate: "2023-08-30"
  },
  {
    id: "2",
    title: "FM!",
    releaseYear: 2018
  }
]

export class AlbumRepositoryImpl implements AlbumRepository {

  private albums: Array<Album> = dummyData

  public getAll = async (): Promise<Album[]> => {
    return this.albums
  }

  public add = async (album: Album) => {
    this.albums.push(album)
  }

  public remove = async (albumId: string) => {
    this.albums = this.albums.filter(album => {
      return album.id != albumId
    })
  }
}

export const albumRepositoryInstance: AlbumRepository = 
  new AlbumRepositoryImpl()
