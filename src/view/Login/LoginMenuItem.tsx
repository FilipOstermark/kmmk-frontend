import { Link } from "react-router-dom"
import { authenticationServiceInstance } from "src/service/AuthenticationService"

export const LoginMenuItem: () => JSX.Element | false = () => {
  const isAuthenticated = authenticationServiceInstance.isLoggedIn()

  if (isAuthenticated) {
    return (<Link to="/account">Mitt konto</Link>)
  }

  // Since we auto-redirect to /login, we don't need the navigation menu item
  return (false)
}
