import { JWT } from "src/model/JWT"
import { AuthTokenRepository, authTokenRepositoryInstance } from "src/repository/AuthTokenRepository"
import { parseJwt } from "src/util/util"

export interface AuthenticationService {
  isLoggedIn: () => boolean
  parsedJWT: () => JWT | null
}

export class AuthenticationServiceImpl implements AuthenticationService {

  private authTokenRepository: AuthTokenRepository
  
  constructor(authTokenRepository: AuthTokenRepository) {
    this.authTokenRepository = authTokenRepository
  }
  
  isLoggedIn: () => boolean = () => this.authTokenRepository.getAuthToken() != null
  
  parsedJWT: () => JWT | null = () => {
    const authToken = this.authTokenRepository.getAuthToken()
    if (!authToken) {
      return null
    }

    return parseJwt(authToken)
  }
}

export const authenticationServiceInstance: AuthenticationService = 
  new AuthenticationServiceImpl(authTokenRepositoryInstance)
