import { Navigate } from "react-router-dom"
import { authTokenRepositoryInstance } from "src/repository/AuthTokenRepository"

interface PrivateRouteProps {
  children: JSX.Element
}

export const PrivateRoute: (props: PrivateRouteProps) => JSX.Element = (
  { children }: PrivateRouteProps
) => {
  if (authTokenRepositoryInstance.getAuthToken()) {
    return children
  }

  return (<Navigate to="/login" />)
}
