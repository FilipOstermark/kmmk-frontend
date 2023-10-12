export interface AuthTokenRepository {
  getAuthToken(): string | null
  setAuthToken(token: string): void
  clearAuthToken(): void
}

export class AuthTokenRepositoryImpl implements AuthTokenRepository {

  private readonly KEY_AUTH_TOKEN: string = "AUTH_TOKEN"
  
  getAuthToken(): string | null {
    return localStorage.getItem(this.KEY_AUTH_TOKEN)
  }

  setAuthToken(token: string): void {
    localStorage.setItem(this.KEY_AUTH_TOKEN, token)
  }

  clearAuthToken(): void {
    localStorage.removeItem(this.KEY_AUTH_TOKEN)
  }

}

export const authTokenRepositoryInstance: AuthTokenRepository = 
  new AuthTokenRepositoryImpl()
