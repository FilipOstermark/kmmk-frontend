import { Navigate, useSearchParams } from "react-router-dom"
import { authTokenRepositoryInstance } from "src/repository/AuthTokenRepository"

export const OAuth2TokenHandler: () => JSX.Element = () => {
  const [params] = useSearchParams()
  authTokenRepositoryInstance.setAuthToken(params.get("token") ?? "")

  return (<Navigate to="/" />)
}
