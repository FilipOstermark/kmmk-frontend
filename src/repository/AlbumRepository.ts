/* eslint-disable @typescript-eslint/require-await */
import { Album } from "src/model/Album"

export interface AlbumRepository {
  getAll: () => Promise<Array<Album>>
  add: (album: Album) => Promise<void>
  remove: (albumId: string) => Promise<void>
}

const KEY_LOCAL_STORAGE = "ALBUM_REPOSITORY"

export class AlbumRepositoryImpl implements AlbumRepository {

  public getAll = async (): Promise<Album[]> => {
    try {
      return JSON.parse(
        localStorage.getItem(KEY_LOCAL_STORAGE) ?? "[]"
      ) as Album[]
    } catch (error) {
      console.error("Failed to load albums", error)
      return []
    }
  }

  public add = async (album: Album) => {
    const currentItems = await this.getAll()
    currentItems.push(album)
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(currentItems))
  }

  public remove = async (albumId: string) => {
    let currentItems = await this.getAll()
    currentItems = currentItems.filter(album => album.id != albumId)
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(currentItems))
  }
}

export const albumRepositoryInstance: AlbumRepository = 
  new AlbumRepositoryImpl()
