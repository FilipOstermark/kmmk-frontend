import { Album } from "src/model/Album"
import { PaginatedResponse } from "src/model/PaginatedResponse"
import { ReleaseGroupSearchResult } from "src/model/ReleaseGroupSearchResult"
import { User } from "src/model/User"
import { authTokenRepositoryInstance } from "src/repository/AuthTokenRepository"
import { URL_BACKEND_BASE } from "src/util/constants"

const HttpMethods = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE"
}

// TODO Expose abstracted methods that matches API instead of fetch()
// TODO Error handling
// TODO Interface
export class BackendServiceImpl {

  private fetch(
    uri: string,
    init?: RequestInit | undefined
  ): Promise<Response> {

    const headers = new Headers()
    headers.append("Accept", "application/json")
    headers.append("Content-Type", "application/json")
    
    const authToken = authTokenRepositoryInstance.getAuthToken()
    if (authToken) {
      headers.append("Authorization", `Bearer ${authToken}`)
    }

    return fetch(URL_BACKEND_BASE + uri, { 
      ...init, 
      mode: "cors",
      headers: headers
    })
  }

  private async getPaginatedResults<T>(
    uri: string, 
    page: number = 0
  ): Promise<T[]> {
    const response = await this.fetch(`${uri}?page=${page}`)
    const paginatedResponseJson = await response.json() as PaginatedResponse<T>
    return paginatedResponseJson.results
  }

  public async getUserList(page: number = 0): Promise<User[]> {
    return await this.getPaginatedResults("/user/list", page)
  }

  public async getAlbumList(page: number = 0): Promise<Album[]> {
    return await this.getPaginatedResults("/album/list", page)
  }

  public async postAlbum(album: Album): Promise<Album> {
    const response = await this.fetch("/album", {
      method: HttpMethods.POST,
      body: JSON.stringify(album)
    })

    return await response.json() as Album
  }

  public async deleteAlbum(albumId: number): Promise<Album> {
    const response = await this.fetch(`/album${albumId}`, {
      method: HttpMethods.DELETE
    })

    return await response.json() as Album
  }

  public async getReleaseGroupSearch(
    albumTitle: string, artistName: string = ""
  ): Promise<ReleaseGroupSearchResult> {
    const queryParams = [
      `release:${albumTitle}`,
      "primarytype:album",
      "status:official"
    ]
    if (artistName) {
      queryParams.push(`artistname:${artistName}*`)
    }

    const joinedQuery = queryParams
      .join(" AND ") + " NOT secondarytype:compilation"
    const encodedJoinedQuery = encodeURIComponent(joinedQuery)
    const fullQueryParamterString = `?query=${encodedJoinedQuery}&limit=25`

    const response = await this.fetch(
      `/release-group${fullQueryParamterString}`
    )
    return await response.json() as ReleaseGroupSearchResult
  }

}

export const backendServiceInstance: BackendServiceImpl = 
  new BackendServiceImpl()
