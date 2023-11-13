import { useState } from "react"
import { Link } from "react-router-dom"
import { authenticationServiceInstance } from "src/service/AuthenticationService"
import { toggleBoolean } from "src/util/util"
import "src/view/Navigation/NavigationMenu.css"

export const NavigationMenu: () => JSX.Element | false = () => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false)
  
  const isAuthenticated = authenticationServiceInstance.isLoggedIn()
  if (!isAuthenticated) {
    return false
  }

  const LinkWrapper: (props: LinkWrapperProps) => JSX.Element = ({
    to, children
  }) => (
    <Link to={to} onClick={() => setIsMenuExpanded(false)}>{children}</Link>
  )

  return (
    <nav>
      <ul 
        className="navigation-menu-list" 
        data-is-expanded={isMenuExpanded}
      >
        <li><LinkWrapper to="/account">Mitt konto</LinkWrapper></li>
        <li><LinkWrapper to=''>Topplista</LinkWrapper></li>
        <li><LinkWrapper to='/new-album'>+ Nytt album</LinkWrapper></li>
        <li><LinkWrapper to='/manifest'>Manifest</LinkWrapper></li>
      </ul>
      <button 
        className="navigation-menu-expand-button" 
        data-is-expanded={isMenuExpanded}
        onClick={() => {setIsMenuExpanded(toggleBoolean)}}
      >
        <span className="top-list-item-button material-symbols-rounded">
          {isMenuExpanded ? "close" : "menu"}
        </span>
      </button>
    </nav>
  )
}

interface LinkWrapperProps {
  to: string,
  children: string
}
