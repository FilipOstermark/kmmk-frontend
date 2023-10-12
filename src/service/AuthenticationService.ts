import { AuthTokenRepository, authTokenRepositoryInstance } from "src/repository/AuthTokenRepository"

export interface AuthenticationService {
  isLoggedIn: () => boolean
  getAuthenticationToken: () => string | null
}

export class AuthenticationServiceImpl implements AuthenticationService {

  private authTokenRepository: AuthTokenRepository
  
  constructor(authTokenRepository: AuthTokenRepository) {
    this.authTokenRepository = authTokenRepository
  }
  
  isLoggedIn: () => boolean = () => this.authTokenRepository.getAuthToken() != null
  
  getAuthenticationToken: () => string | null = () => this.authTokenRepository.getAuthToken()
}

export const authenticationServiceInstance: AuthenticationService = 
  new AuthenticationServiceImpl(authTokenRepositoryInstance)
