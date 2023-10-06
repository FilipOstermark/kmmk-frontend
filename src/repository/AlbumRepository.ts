/* eslint-disable @typescript-eslint/require-await */
import { backendServiceImpl } from "src/api/BackendServiceImpl"
import { Album } from "src/model/Album"

export interface AlbumRepository {
  getAll: () => Promise<Array<Album>>
  add: (album: Album) => Promise<void>
  remove: (albumId: string) => Promise<void>
}

const KEY_LOCAL_STORAGE = "ALBUM_REPOSITORY"

export class AlbumRepositoryLocalStorageImpl implements AlbumRepository {

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
    currentItems = currentItems.filter(album => album.mbid != albumId)
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(currentItems))
  }
}

export class AlbumRepositoryBackendImpl implements AlbumRepository {
  public getAll = async (): Promise<Album[]> => 
    // TODO Error handling
     backendServiceImpl.getAlbumList()

  public add = async (album: Album) => {
    // TODO Error handling
    // TODO Use backend client
    // TODO No sending credentials
    const newAlbum = backendServiceImpl.postAlbum(album)
    console.log("Successfully added album:", JSON.stringify(newAlbum))
  }

  public remove = async (albumId: string) => {
    // TODO
    let currentItems = await this.getAll()
    currentItems = currentItems.filter(album => album.mbid != albumId)
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(currentItems))
  }
}

export const albumRepositoryInstance: AlbumRepository = 
  new AlbumRepositoryBackendImpl()
