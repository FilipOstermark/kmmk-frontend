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

export class BackendError extends Error {

  public readonly cause: Response

  constructor(message: string, cause: Response) {
    super(message)
    this.cause = cause
  }
}

export class AuthenticationRequiredError extends BackendError {}

type AuthenticationRequiredHandler = () => void

// TODO Expose abstracted methods that matches API instead of fetch()
// TODO Error handling
// TODO Interface
export class BackendServiceImpl {

  private authenticationRequiredHandler: AuthenticationRequiredHandler | null = 
    null

  private async fetch<T>(
    uri: string,
    init?: RequestInit | undefined
  ): Promise<T> {

    const headers = new Headers()
    headers.append("Accept", "application/json")
    headers.append("Content-Type", "application/json")
    
    const authToken = authTokenRepositoryInstance.getAuthToken()
    if (authToken) {
      headers.append("Authorization", `Bearer ${authToken}`)
    }

    const finalUri = URL_BACKEND_BASE + uri
    const response: Response = await fetch(finalUri, { 
      ...init, 
      mode: "cors",
      headers: headers
    })

    if (response.status == 401) {
      if (this.authenticationRequiredHandler) {
        this.authenticationRequiredHandler()
      }

      throw new AuthenticationRequiredError('Authentication required', response)
    } else if (!response.ok) {
      throw new BackendError(`Request for ${finalUri} failed (${response.status} ${response.statusText})`, response)
    }

    return await response.json() as T
  }

  private async getPaginatedResults<T>(
    uri: string, 
    page: number = 0
  ): Promise<T[]> {
    const paginatedResponseJson = await this.fetch<PaginatedResponse<T>>(
      `${uri}?page=${page}`
    )
    return paginatedResponseJson.results
  }

  public loginWithGoogle() {
    window.location.href='http://localhost:8080/oauth2/authorization/google'
  }

  public async getUserList(page: number = 0): Promise<User[]> {
    return await this.getPaginatedResults("/user/list", page)
  }

  public async getUserSelf(): Promise<User> {
    return await this.fetch("/user/self")
  }

  public async deleteUserSelf(): Promise<void> {
    await this.fetch("/user/self", {
      method: HttpMethods.DELETE
    })
  }

  public async getAlbumList(page: number = 0): Promise<Album[]> {
    return await this.getPaginatedResults("/album/list", page)
  }

  public async postAlbum(album: Album): Promise<Album> {
    return await this.fetch<Album>("/album", {
      method: HttpMethods.POST,
      body: JSON.stringify(album)
    })
  }

  public async deleteAlbum(albumId: number): Promise<Album> {
    return await this.fetch<Album>(`/album${albumId}`, {
      method: HttpMethods.DELETE
    })
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

    return await this.fetch<ReleaseGroupSearchResult>(
      `/release-group${fullQueryParamterString}`
    )
  }
  
  public setAuthenticationRequiredHandler(
    authenticationRequiredHandler: AuthenticationRequiredHandler
  ): void {
    this.authenticationRequiredHandler = authenticationRequiredHandler
  }

}

export const backendServiceInstance: BackendServiceImpl = 
  new BackendServiceImpl()
