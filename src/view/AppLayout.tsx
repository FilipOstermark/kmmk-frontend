import { Link, Outlet, useNavigate } from "react-router-dom"
import KmmkLogo from "src/assets/kmmk-logo.png"
import RuleBook from "src/assets/MoHU.pdf"

export const AppLayout: () => JSX.Element = () => {
  const navigate = useNavigate()

  return (
    <>
      <header>
        <img 
          width={200} 
          src={KmmkLogo} 
          onClick={() => { navigate('/') }}
          alt="KMMK Logo"
          ></img>
        <nav>
          <ul>
            <li>
              <a href="http://localhost:8080/oauth2/authorization/facebook">Login</a>
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
      </header>

      <article>
        <Outlet />
      </article>
    </>
  )
}
