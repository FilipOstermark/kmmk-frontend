
export class BackendClient {

  public fetch(
    input: RequestInfo,
    init?: RequestInit | undefined
  ): Promise<Response> {

    // TODO Replace session with JWT and skip sending session
    return fetch(input, { 
      ...init, 
      mode: "cors",
      credentials: "include"
    })
  }

}

export const backendClientInstance: BackendClient = new BackendClient()
