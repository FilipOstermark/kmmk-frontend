import { Link } from "react-router-dom"
import RuleBook from "src/assets/MoHU.pdf"
import { authenticationServiceInstance } from "src/service/AuthenticationService"

export const NavigationMenu: () => JSX.Element | false = () => {
  
  const isAuthenticated = authenticationServiceInstance.isLoggedIn()
  if (!isAuthenticated) {
    return false
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/account">Mitt konto</Link>
        </li>
        <li>
          <Link to=''>Topplista</Link>
        </li>
        <li>
          <Link to='/new-album'>+ Nytt album</Link>
        </li>
        <li>
          <a href={RuleBook}>Manifest</a>
        </li>
      </ul>
    </nav>
  )
}