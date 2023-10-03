
export class BackendClient {

  public fetch(
    input: RequestInfo,
    init?: RequestInit | undefined
  ): Promise<Response> {

    return fetch(input, { 
      ...init, 
      mode: "cors",
      credentials: "include"
    })
  }

}

export const backendClientInstance: BackendClient = new BackendClient()
