import { authTokenRepositoryInstance } from "src/repository/AuthTokenRepository"

// TODO
// Expose abstracted methods that matches API instead of fetch()
export class BackendClient {

  public fetch(
    input: RequestInfo,
    init?: RequestInit | undefined
  ): Promise<Response> {

    const headers = new Headers()
    headers.append("Accept", "application/json")
    headers.append("Content-Type", "application/json")
    
    const authToken = authTokenRepositoryInstance.getAuthToken()
    if (authToken) {
      headers.append("Authorization", `Bearer ${authToken}`)
    }

    return fetch(input, { 
      ...init, 
      mode: "cors",
      headers: headers
    })
  }

}

export const backendClientInstance: BackendClient = new BackendClient()
