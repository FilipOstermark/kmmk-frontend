import { Navigate } from "react-router-dom"
import { authenticationServiceInstance } from "src/service/AuthenticationService"

interface PrivateRouteProps {
  children: JSX.Element
}

export const PrivateRoute: (props: PrivateRouteProps) => JSX.Element = (
  { children }: PrivateRouteProps
) => {
  if (authenticationServiceInstance.isLoggedIn()) {
    return children
  }

  return (<Navigate to="/login" />)
}
