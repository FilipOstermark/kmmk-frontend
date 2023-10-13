import { useState } from "react"
import { Link } from "react-router-dom"
import RuleBook from "src/assets/MoHU.pdf"
import { authenticationServiceInstance } from "src/service/AuthenticationService"
import { toggleBoolean } from "src/util/util"
import "src/view/Navigation/NavigationMenu.css"

export const NavigationMenu: () => JSX.Element | false = () => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false)
  
  const isAuthenticated = authenticationServiceInstance.isLoggedIn()
  if (!isAuthenticated) {
    return false
  }

  return (
    <nav>
      <ul className="navigation-menu-list" data-is-expanded={isMenuExpanded}>
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
      <button 
        className="navigation-menu-expand-button" 
        onClick={() => {setIsMenuExpanded(toggleBoolean)}}
      >
        <span className="top-list-item-button material-symbols-rounded">menu</span>
      </button>
    </nav>
  )
}