export interface AuthTokenRepository {
  setAuthToken(token: string): void
  getAuthToken(): string | null
}

export class AuthTokenRepositoryImpl implements AuthTokenRepository {

  private readonly KEY_AUTH_TOKEN: string = "AUTH_TOKEN"
  
  setAuthToken(token: string): void {
    localStorage.setItem(this.KEY_AUTH_TOKEN, token)
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.KEY_AUTH_TOKEN)
  }

}

export const authTokenRepositoryInstance: AuthTokenRepository = 
  new AuthTokenRepositoryImpl()
