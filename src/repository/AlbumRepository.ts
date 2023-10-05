/* eslint-disable @typescript-eslint/require-await */
import { backendClientInstance } from "src/api/BackendClient"
import { Album } from "src/model/Album"
import { PaginatedResponse } from "src/model/PaginatedResponse"

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
  public getAll = async (): Promise<Album[]> => {
    // TODO Error handling
    const response = await backendClientInstance.fetch("http://localhost:8080/album/list")
    const responseJson = await response.json() as PaginatedResponse<Album>
    const albums: Album[] = responseJson["results"]
    console.log(responseJson)

    return albums
  }

  public add = async (album: Album) => {
    // TODO Error handling
    // TODO Use backend client
    // TODO No sending credentials
    backendClientInstance.fetch("http://localhost:8080/album/", {
      method: "POST", 
      body: JSON.stringify(album)
    }).then(res => {
      console.log("Seems ok! ", res)
      res.json().then(body => { console.log("Response json: ", body) }).catch(err => { console.error("Json err: ", err) })
    }).catch(err => {
      console.error("Request err: ", err)
    })
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
