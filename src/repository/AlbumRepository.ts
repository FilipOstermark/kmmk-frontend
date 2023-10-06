/* eslint-disable @typescript-eslint/require-await */
import { backendServiceInstance } from "src/api/BackendServiceImpl"
import { Album } from "src/model/Album"
import { ReleaseGroupSearchResult } from "src/model/ReleaseGroupSearchResult"

export interface AlbumRepository {
  getAll: () => Promise<Array<Album>>
  add: (album: Album) => Promise<void>
  remove: (albumId: number) => Promise<void>
  searchReleaseGroup: (
    albumTitle: string, 
    artistName: string
  ) => Promise<ReleaseGroupSearchResult>
}

export class AlbumRepositoryBackendImpl implements AlbumRepository {
  // TODO Error handling
  public getAll = async (): Promise<Album[]> => 
     backendServiceInstance.getAlbumList()

  // TODO Error handling
  public add = async (album: Album) => {
    const newAlbum = backendServiceInstance.postAlbum(album)
    console.log("Successfully added album:", JSON.stringify(newAlbum))
  }

  // TODO Error handling
  public remove = async (albumId: number) => {
    await backendServiceInstance.deleteAlbum(albumId)
  }

  // TODO Error handling
  public searchReleaseGroup = async (
    albumTitle: string, 
    artistName: string = ""
  ) => await backendServiceInstance.getReleaseGroupSearch(
    albumTitle, 
    artistName
  )
}

export const albumRepositoryInstance: AlbumRepository = 
  new AlbumRepositoryBackendImpl()
